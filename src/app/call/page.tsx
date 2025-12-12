import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare } from 'lucide-react';
import { users } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

const ParticipantVideo = ({ user, isMuted, hasVideo }: { user: typeof users[0], isMuted?: boolean, hasVideo?: boolean }) => (
  <div className="relative aspect-video bg-card rounded-lg overflow-hidden border shadow-sm">
    {hasVideo ? (
      <Avatar className="w-full h-full rounded-none">
        <AvatarImage src={user.avatar.imageUrl} className="object-cover" data-ai-hint={user.avatar.imageHint} />
        <AvatarFallback className="text-4xl rounded-none">{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ) : (
      <div className="w-full h-full bg-secondary flex items-center justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar.imageUrl} data-ai-hint={user.avatar.imageHint} />
          <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    )}
    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded-md flex items-center gap-2">
      {isMuted && <MicOff className="h-4 w-4 text-red-500" />}
      <span>{user.name}</span>
    </div>
  </div>
);

export default function CallPage() {
  const participants = [users[0], users[1], users[2], users[3]];

  return (
    <MainLayout>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-4">
            <h1 className="text-3xl font-bold font-headline">Team Sync: Project Phoenix</h1>
            <p className="text-muted-foreground">Live call in progress...</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {participants.map((p, i) => (
                <ParticipantVideo key={p.id} user={p} isMuted={i % 2 === 0} hasVideo={i % 3 !== 0} />
            ))}
        </div>

        <Card className="fixed bottom-6 left-1/2 -translate-x-1/2 w-auto mx-auto shadow-2xl">
            <CardContent className="p-2">
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="lg" className="rounded-full w-14 h-14 p-0">
                        <Mic className="h-6 w-6" />
                    </Button>
                    <Button variant="secondary" size="lg" className="rounded-full w-14 h-14 p-0">
                        <VideoOff className="h-6 w-6" />
                    </Button>
                    <Button variant="secondary" size="lg" className="rounded-full w-14 h-14 p-0">
                        <Users className="h-6 w-6" />
                    </Button>
                     <Button variant="secondary" size="lg" className="rounded-full w-14 h-14 p-0">
                        <MessageSquare className="h-6 w-6" />
                    </Button>
                    <Button variant="destructive" size="lg" className="rounded-full w-16 h-14 px-6">
                        <PhoneOff className="h-6 w-6" />
                        <span className="ml-2 font-bold hidden sm:inline">Leave</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
