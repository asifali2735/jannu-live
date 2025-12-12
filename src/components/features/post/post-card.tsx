'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  HeartOff,
} from 'lucide-react';
import type { Post } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSecretlyLiked, setIsSecretlyLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };
  
  const handleSecretLike = () => {
    setIsSecretlyLiked(!isSecretlyLiked);
  };

  return (
    <Card className="overflow-hidden border border-accent/20 shadow-lg shadow-accent/10">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatar.imageUrl} alt={post.author.name} data-ai-hint={post.author.avatar.imageHint}/>
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">@{post.author.username} · {post.timestamp}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-primary/30 shadow-inner shadow-primary/20">
            <Image src={post.image.imageUrl} alt={post.image.description} fill className="object-cover" data-ai-hint={post.image.imageHint}/>
          </div>
        )}
        {post.video && (
           <div className="relative aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden rounded-lg border border-accent/30 shadow-inner shadow-accent/20">
            <Image src={post.video.imageUrl} alt={post.video.description} fill className="object-cover" data-ai-hint={post.video.imageHint} />
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
                <span className={cn(isLiked ? 'text-primary font-bold' : '')}>{likeCount}</span>
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
