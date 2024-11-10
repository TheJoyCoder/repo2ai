'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { RepoExtractor } from '@/components/repo-extractor';
import type { Session } from 'next-auth';

interface HomeContentProps {
  session: Session | null;
}

export function HomeContent({ session }: HomeContentProps) {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Repo2AI</h1>
          <p className="text-muted-foreground">
            Extrae y visualiza el contenido de cualquier repositorio de GitHub.
          </p>
        </div>

        {session ? (
          <RepoExtractor />
        ) : (
          <div className="text-muted-foreground space-y-2">
            <Button 
              onClick={() => signIn('github')} 
              variant="outline"
              className="gap-2"
            >
              Iniciar sesión con GitHub
            </Button>
            <p className="text-xs">
              No se almacenarán datos de sesión.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
