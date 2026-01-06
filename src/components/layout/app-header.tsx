'use client';

import { Search, Bell, Sun, Moon } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/lib/placeholder-data';
import Link from 'next/link';
import { HeartBeatIcon } from '../icons/heart-beat-icon';

const JannuLiveLogo = () => (
    <div className="flex items-center gap-2">
        <HeartBeatIcon
            className="h-8 w-8 text-primary"
            style={{
                filter: 'drop-shadow(0 0 8px hsl(var(--primary)))',
            }}
        />
        <h1 
            className="text-xl font-headline font-bold"
            style={{
                textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
            }}
        >Jannu Live</h1>
    </div>
);


export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:block">
        <JannuLiveLogo />
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-card focus:border-primary focus:shadow-lg focus:shadow-primary/50"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-secondary">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8 border-2 border-primary/50 hover:border-primary transition-colors">
                 <AvatarImage src={currentUser.avatar.imageUrl} alt={currentUser.name} data-ai-hint={currentUser.avatar.imageHint} />
                 <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
