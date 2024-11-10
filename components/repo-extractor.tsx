'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function RepoExtractor() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validar la URL
      const url = new URL(repoUrl);
      if (!url.hostname.includes('github.com')) {
        throw new Error('La URL debe ser de GitHub');
      }

      // Extraer usuario y nombre del repositorio
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length < 2) {
        throw new Error('URL de repositorio inválida');
      }

      const [owner, repo] = pathParts;
      router.push(`/repo/${owner}/${repo}`);

    } catch (error) {
      toast.error('Error', {
        description: error instanceof Error ? error.message : "Error al procesar la URL",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input 
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="https://github.com/usuario/repositorio" 
        className="flex-1"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button 
        onClick={handleSubmit} 
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Cargar Repositorio"}
      </Button>
    </div>
  );
}
