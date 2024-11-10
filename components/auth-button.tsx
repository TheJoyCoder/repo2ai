'use client';

import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { RepoExtractor } from "@/components/repo-extractor";
import { toast } from 'sonner';

export function AuthButton() {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    try {
      const result = await signIn('github', {
        redirect: false,
        callbackUrl: '/',
      });
      
      if (result?.error) {
        toast.error('Error al iniciar sesión', {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error('Error al iniciar sesión', {
        description: 'Hubo un problema al conectar con GitHub' + error?.toString(),
      });
    }
  };

  if (status === 'loading') {
    return (
      <Button className="w-full" variant="outline" disabled>
        <GithubIcon className="mr-2 h-4 w-4" />
        Cargando...
      </Button>
    );
  }

  if (session) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Conectado como {session.user?.name}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Cerrar sesión
          </Button>
        </div>
        <RepoExtractor />
      </div>
    );
  }

  return (
    <Button 
      className="w-full" 
      variant="outline" 
      onClick={handleSignIn}
    >
      <GithubIcon className="mr-2 h-4 w-4" />
      Iniciar sesión con GitHub
    </Button>
  );
} 
