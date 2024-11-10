import { Octokit } from '@octokit/rest';
import type { RepoFile } from '@/types/repo';

export async function getRepoContent(
  owner: string,
  repo: string,
  accessToken: string
): Promise<RepoFile[]> {
  const octokit = new Octokit({
    auth: accessToken,
  });

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

  return getDirectoryContent('');
} 
