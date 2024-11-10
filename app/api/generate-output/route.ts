import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Octokit } from '@octokit/rest';
import { generateTreeStructure, isExcluded } from '@/lib/tree-utils';
import type { RepoFile } from '@/types/repo';

interface GenerateOutputRequest {
  owner: string;
  repo: string;
  fileTypes?: string[];
  exclusionPatterns?: string[];
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { owner, repo, fileTypes, exclusionPatterns } = (await request.json()) as GenerateOutputRequest;
    const exclusions = new Set<string>(exclusionPatterns || []);

    const octokit = new Octokit({
      auth: session.accessToken,
    });

    async function getFileContent(owner: string, repo: string, path: string): Promise<string> {
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path,
        });

        if ('content' in data && typeof data.content === 'string') {
          return Buffer.from(data.content, 'base64').toString('utf-8');
        }
        return '';
      } catch (error) {
        console.error(`Error getting content for ${path}:`, error);
        return '';
      }
    }

    async function processFiles(files: RepoFile[]): Promise<string> {
      let output = 'Directory Structure:\n';
      output += '-------------------\n';
      output += '/ \n' + generateTreeStructure(files).join('\n') + '\n\n';
      
      output += 'File Contents:\n';
      output += '--------------\n';

      async function processFile(file: RepoFile): Promise<string> {
        let content = '';
        
        if (file.type === 'dir' && file.children) {
          for (const child of file.children) {
            content += await processFile(child);
          }
        } else if (file.type === 'file') {
          if (!isExcluded(file.path, exclusions) && 
              (!fileTypes || fileTypes.some(ext => file.name.endsWith(ext)))) {
            const fileContent = await getFileContent(owner, repo, file.path);
            content += `File: ${file.path}\n`;
            content += '-'.repeat(50) + '\n';
            content += `Content of ${file.path}:\n`;
            content += fileContent + '\n\n';
          }
        }
        
        return content;
      }

      for (const file of files) {
        output += await processFile(file);
      }

      return output;
    }

    // Obtener la estructura del repositorio
    const { data: repoContent } = await octokit.repos.getContent({
      owner,
      repo,
      path: '',
    });

    if (Array.isArray(repoContent)) {
      const output = await processFiles(repoContent as RepoFile[]);
      
      return new NextResponse(output, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${repo}-output.txt"`,
        },
      });
    }

    throw new Error('No se pudo obtener el contenido del repositorio');

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Error al generar output',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 
