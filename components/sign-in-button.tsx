'use client';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn('github')}
      className="flex items-center gap-2"
    >
      <Github className="h-5 w-5" />
      Iniciar sesión con GitHub
    </Button>
  );
} 
