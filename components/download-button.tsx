'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadButtonProps {
  owner: string;
  repo: string;
}

export function DownloadButton({ owner, repo }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (fileTypes?: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-output', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner,
          repo,
          fileTypes,
          exclusionPatterns: [
            'node_modules/',
            '.git/',
            '.next/',
            'dist/',
            'build/',
            '*.lock',
            '*.log',
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Error al generar el output');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${repo}-output.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Output generado', {
        description: 'El archivo se ha descargado correctamente',
      });
    } catch (error) {
      toast.error('Error', {
        description: error instanceof Error ? error.message : "Error al generar output",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
      <div className="space-y-2">
        <h3 className="font-medium">Generar Prompt para IA</h3>
        <p className="text-sm text-muted-foreground">
          Descarga un archivo de texto formateado especialmente para hacer preguntas a ChatGPT u otros LLMs sobre tu repositorio.
          El archivo incluirá la estructura del proyecto y el contenido de los archivos seleccionados.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() => handleDownload(['.ts', '.tsx', '.js', '.jsx'])}
          disabled={isLoading}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          {isLoading ? 'Generando...' : 'Solo archivos TS/JS'}
          <span className="sr-only">
            Descargar prompt con solo archivos TypeScript y JavaScript
          </span>
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDownload()}
          disabled={isLoading}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          {isLoading ? 'Generando...' : 'Todos los archivos'}
          <span className="sr-only">
            Descargar prompt con todos los archivos del repositorio
          </span>
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground">
        💡 Tip: Para repositorios grandes, recomendamos usar la opción de &quot;Solo archivos TS/JS&quot; 
        o filtrar manualmente los archivos relevantes para tu consulta.
      </p>
    </div>
  );
} 
