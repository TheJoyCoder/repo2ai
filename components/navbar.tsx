'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 pl-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Repo2AI Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden font-bold text-lg sm:inline-block">
                Repo2AI
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 pr-2">
            {status === 'loading' ? (
              <div className="h-9 w-[70px] animate-pulse rounded-md bg-muted" />
            ) : session ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-muted-foreground lg:inline-block">
                  {session.user?.name}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative h-8 w-8 rounded-full"
                    >
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'Avatar'}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled className="flex justify-between">
                      <span className="truncate font-medium">
                        {session.user?.name}
                      </span>
                    </DropdownMenuItem>
                    {session.user?.email && (
                      <DropdownMenuItem disabled className="flex justify-between text-xs text-muted-foreground">
                        <span className="truncate">
                          {session.user.email}
                        </span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      asChild
                      className="text-muted-foreground"
                    >
                      <Link
                        href={`https://github.com/${session?.user?.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        <span>Perfil de GitHub</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signIn('github')}
                className="gap-2"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
