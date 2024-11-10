import type { RepoFile } from '@/types/repo';

export function generateTreeStructure(files: RepoFile[], prefix: string = ''): string[] {
  const tree: string[] = [];
  
  files.sort((a, b) => {
    // Ordenar directorios primero, luego archivos
    if (a.type === 'dir' && b.type !== 'dir') return -1;
    if (a.type !== 'dir' && b.type === 'dir') return 1;
    return a.name.localeCompare(b.name);
  });

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const newPrefix = isLast ? prefix + '    ' : prefix + '│   ';
    
    tree.push(`${prefix}${connector}${file.name}${file.type === 'dir' ? '/' : ''}`);
    
    if (file.type === 'dir' && file.children) {
      tree.push(...generateTreeStructure(file.children, newPrefix));
    }
  });

  return tree;
}

export function isExcluded(path: string, exclusionPatterns: Set<string>): boolean {
  for (const pattern of exclusionPatterns) {
    if (pattern.startsWith('/') && pattern.endsWith('/')) {
      if (path.startsWith(pattern.slice(1)) || path === pattern.slice(1, -1)) {
        return true;
      }
    } else if (pattern.endsWith('/')) {
      if (path.startsWith(pattern) || path === pattern.slice(0, -1)) {
        return true;
      }
    } else if (pattern.startsWith('/')) {
      if (path === pattern.slice(1) || path.startsWith(pattern.slice(1) + '/')) {
        return true;
      }
    } else {
      const pathParts = path.split('/');
      if (pathParts.some(part => new RegExp('^' + pattern.replace(/\*/g, '.*') + '$').test(part))) {
        return true;
      }
    }
  }
  return false;
} 
