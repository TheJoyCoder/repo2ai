'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { Github, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function RepoInput() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    
    try {
      setIsLoading(true);
      const url = new URL(repoUrl);

      if (!url.hostname.includes('github.com')) {
        throw new Error('Introduce una URL válida de GitHub');
      }

      const path = url.pathname.replace(/\/$/, '');
      const parts = path.split('/').filter(Boolean);
      
      if (parts.length < 2) {
        throw new Error('Introduce una URL válida de GitHub');
      }

      const [owner, repo] = parts;
      await router.push(`/repo/${owner}/${repo}`);
      
    } catch (error) {
      console.error('Error completo:', error);
      setIsError(true);
      toast.error('Introduce una URL válida de GitHub');
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
    if (isError) setIsError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className={cn(
                "h-5 w-5",
                isError ? "text-red-500" : "text-gray-400"
              )} />
            </div>
            <Input
              type="text"
              placeholder="https://github.com/usuario/repositorio"
              value={repoUrl}
              onChange={handleUrlChange}
              className={cn(
                "pl-10 h-12 text-lg w-full transition-colors duration-200",
                isError && "border-red-500 focus-visible:ring-red-500 text-red-900 placeholder:text-red-300"
              )}
              disabled={isLoading}
            />
          </div>
          {isError && (
            <p className="text-sm text-red-500 mt-1">
              Por favor, introduce una URL de GitHub válida
            </p>
          )}
        </div>
        <Button 
          type="submit" 
          size="lg" 
          className="h-12 px-8 text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            'Explorar Repositorio'
          )}
        </Button>
      </div>
    </form>
  );
}
