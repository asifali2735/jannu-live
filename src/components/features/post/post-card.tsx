'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  HeartOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

export default function PostCard({ post }: { post: any }) {
  const { user } = useUser();
  const firestore = useFirestore();

  const [isLiked, setIsLiked] = useState(post.likedBy?.includes(user?.uid) || false);
  const [isSecretlyLiked, setIsSecretlyLiked] = useState(false);
  
  const postRef = useMemoFirebase(() => firestore ? doc(firestore, 'posts', post.id) : null, [firestore, post.id]);

  const handleLike = () => {
     if (!user || !postRef) return;
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Optimistically update the UI, then update Firestore
    updateDoc(postRef, {
      likes: increment(newLikedState ? 1 : -1),
    });
  };
  
  const handleSecretLike = () => {
    setIsSecretlyLiked(!isSecretlyLiked);
  };

  const timestamp = post.createdAt?.toDate ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'just now';

  return (
    <Card className="overflow-hidden bg-card border-primary/20 shadow-lg shadow-primary/10">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="border-2 border-primary shadow-lg shadow-primary/50">
          <AvatarImage src={post.authorAvatarUrl} alt={post.authorName} />
          <AvatarFallback>{post.authorName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-primary-foreground">{post.authorName}</p>
          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.mediaType === 'image' && post.mediaUrl && (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-primary/30 shadow-inner shadow-primary/20">
            <Image src={post.mediaUrl} alt={post.mediaDescription || 'Post image'} fill className="object-cover" data-ai-hint={post.mediaHint}/>
          </div>
        )}
        {post.mediaType === 'video' && post.mediaUrl && (
           <div className="relative aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden rounded-lg border border-primary/30 shadow-inner shadow-primary/20">
            <Image src={post.mediaUrl} alt={post.mediaDescription || 'Post video'} fill className="object-cover" data-ai-hint={post.mediaHint} />
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
             </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart className={cn('h-5 w-5', isLiked ? 'text-primary fill-primary' : '')} />
                <span className={cn('font-bold', isLiked ? 'text-primary' : 'text-muted-foreground')}>{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSecretLike} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <HeartOff className={cn('h-5 w-5', isSecretlyLiked ? 'text-primary/70' : '')} />
                 <span>{isSecretlyLiked ? 'Secretly Liked' : 'Secret Like'}</span>
            </Button>
        </div>
        <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
