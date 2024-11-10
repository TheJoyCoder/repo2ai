'use client';

import { useState } from 'react';
import type { RepoFile } from '@/types/repo';
import { ChevronRight, ChevronDown, File, Folder, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface RepoViewerProps {
  files: RepoFile[];
}

interface FileItemProps {
  file: RepoFile;
  depth?: number;
  onFileClick: (file: RepoFile) => void;
}

function FileItem({ file, depth = 0, onFileClick }: FileItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = file.type === 'dir' && file.children?.length;
  
  return (
    <div className="font-mono">
      <div 
        className={cn(
          "flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded",
          { 
            "cursor-pointer": true,
            "bg-muted/50": file.type === 'file'
          }
        )}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else {
            onFileClick(file);
          }
        }}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        ) : null}
        {file.type === 'dir' ? (
          <Folder className="h-4 w-4 text-blue-500" />
        ) : (
          <File className="h-4 w-4 text-gray-500" />
        )}
        <span className="text-sm">{file.name}</span>
      </div>
      
      {isOpen && file.children && (
        <div>
          {file.children.map((child) => (
            <FileItem 
              key={child.path} 
              file={child} 
              depth={depth + 1}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

async function fetchFileContent(file: RepoFile): Promise<string> {
  if (!file.download_url) return '';
  
  try {
    const response = await fetch(file.download_url);
    return await response.text();
  } catch (error) {
    console.error('Error fetching file content:', error);
    return 'Error loading file content';
  }
}

export function RepoViewer({ files }: RepoViewerProps) {
  const [selectedFile, setSelectedFile] = useState<RepoFile | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileClick = async (file: RepoFile) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      const content = await fetchFileContent(file);
      setFileContent(content);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4 bg-background overflow-auto max-h-[calc(100vh-12rem)]">
        <div className="space-y-1">
          {files.map((file) => (
            <FileItem 
              key={file.path} 
              file={file} 
              onFileClick={handleFileClick}
            />
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-background overflow-auto max-h-[calc(100vh-12rem)]">
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <h3 className="font-medium text-sm">{selectedFile.path}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <pre className="text-sm overflow-auto p-4 bg-muted rounded-lg">
                <code>{fileContent}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Selecciona un archivo para ver su contenido
          </div>
        )}
      </div>
    </div>
  );
}
