import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RepoViewer } from '@/components/repo-viewer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getRepoContent } from '@/lib/github';
import { DownloadButton } from '@/components/download-button';
import { ArrowLeft, Github } from 'lucide-react';

type PageProps = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function RepoPage({
  params,
}: PageProps) {
  const session = await auth();
  if (!session?.accessToken) {
    redirect('/');
  }

  const resolvedParams = await params;
  const [owner, repo] = resolvedParams.slug;
  if (!owner || !repo) {
    redirect('/');
  }

  try {
    const repoContent = await getRepoContent(owner, repo, session.accessToken);

    return (
      <div className="container mx-auto p-4 sm:p-8 pt-6">
        <div className="flex flex-col gap-4 mb-8">
          {/* Cabecera y botón de volver */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden sm:flex mr-4"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold truncate">{owner}/{repo}</h1>
              <p className="text-sm text-muted-foreground">Contenido del repositorio</p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:flex"
            >
              <Link href={`https://github.com/${owner}/${repo}`} target="_blank">
                <Github className="h-4 w-4 mr-2" />
                Ver en GitHub
              </Link>
            </Button>
          </div>

          {/* Barra de acciones móvil */}
          <div className="flex sm:hidden gap-2 justify-between">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Link href={`https://github.com/${owner}/${repo}`} target="_blank">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>

          {/* Botones de descarga */}
          <DownloadButton owner={owner} repo={repo} />
        </div>

        <RepoViewer files={repoContent} />
      </div>
    );
  } catch (error) {
    console.error('Error loading repository:', error);
    redirect('/');
  }
} 
