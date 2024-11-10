import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Octokit } from '@octokit/rest';
import type { RepoFile } from '@/types/repo';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'No autorizado', details: 'Sesión no válida' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Datos recibidos:', body); // Para debug

    const { owner, repo } = body;

    if (!owner || !repo) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos', 
          details: `Propietario y repositorio son requeridos. Recibido: owner=${owner}, repo=${repo}` 
        },
        { status: 400 }
      );
    }

    const octokit = new Octokit({
      auth: session.accessToken,
    });

    // Verificar acceso al repositorio
    try {
      await octokit.repos.get({
        owner,
        repo,
      });
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Repositorio no accesible',
          details: 'No tienes permisos para acceder a este repositorio' + error?.toString()
        },
        { status: 403 }
      );
    }

    async function getDirectoryContent(path: string): Promise<RepoFile[]> {
      const { data: content } = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      if (Array.isArray(content)) {
        const files = await Promise.all(
          content.map(async (item): Promise<RepoFile> => {
            const baseFile: RepoFile = {
              name: item.name,
              path: item.path,
              sha: item.sha,
              size: item.size,
              url: item.url ?? '',
              html_url: item.html_url ?? '',
              git_url: item.git_url ?? '',
              download_url: item.download_url ?? '',
              type: item.type as 'file' | 'dir',
            };

            if (item.type === 'dir') {
              return {
                ...baseFile,
                children: await getDirectoryContent(item.path),
              };
            }
            return baseFile;
          })
        );
        return files;
      }

      throw new Error('No se pudo obtener el contenido del directorio');
    }

    const fullContent = await getDirectoryContent('');

    return NextResponse.json({
      success: true,
      data: fullContent,
    });

  } catch (error) {
    console.error('Error al extraer repositorio:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { 
        error: 'Error al extraer repositorio',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
} 
