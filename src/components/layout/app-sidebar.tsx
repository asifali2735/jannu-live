'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  MessageSquare,
  Phone,
  Settings,
  Users,
  Video,
  Wallet,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/placeholder-data';
import { useTheme } from 'next-themes';
import React from 'react';
import { HeartBeatIcon } from '../icons/heart-beat-icon';

const JannuLiveLogo = () => (
    <div className="flex items-center gap-2 p-2">
        <HeartBeatIcon
            className="text-primary w-8 h-8"
            style={{
                filter: 'drop-shadow(0 0 8px hsl(var(--primary)))',
            }}
        />
        <h1
            className="text-xl font-headline font-bold text-foreground"
            style={{
                textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
            }}
        >Jannu Live</h1>
    </div>
);

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <JannuLiveLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip="Home"
              >
                <Link href="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/chat'}
                tooltip="Chat"
              >
                <Link href="/chat">
                  <MessageSquare />
                  <span>Live Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/call'}
                tooltip="Call"
              >
                <Link href="/call">
                  <Video />
                  <span>Group Call</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Monetization</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Ads">
                <Wallet />
                <span>My Ads</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
         <div className="flex items-center justify-between p-2">
           <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src={currentUser.avatar.imageUrl} alt={currentUser.name} data-ai-hint={currentUser.avatar.imageHint} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground">@{currentUser.username}</span>
            </div>
          </div>
          <div className="flex items-center">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
              <Link href="/login">
                  <LogOut className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
