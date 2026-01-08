'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Video, Send } from 'lucide-react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function CreatePost() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<{type: 'image' | 'video', url: string, hint: string, description: string} | null>(null);
  const { toast } = useToast();

  const handlePost = async () => {
    if (!user || !firestore) return;
    if (!content.trim() && !media) {
      toast({
        variant: 'destructive',
        title: 'Empty Post',
        description: 'You must add some text or media to create a post.',
      });
      return;
    }

    try {
      await addDoc(collection(firestore, 'posts'), {
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        authorAvatarUrl: user.photoURL || '',
        content,
        mediaUrl: media?.url || null,
        mediaType: media?.type || null,
        mediaHint: media?.hint || null,
        mediaDescription: media?.description || null,
        likes: 0,
        comments: 0,
        createdAt: serverTimestamp(),
      });
      setContent('');
      setMedia(null);
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not create post.',
      });
    }
  };

  const handleSelectImage = () => {
    // For now, we'll just use a placeholder image.
    const image = PlaceHolderImages.find(img => img.id === 'post-image-2');
    if (image) {
      setMedia({ type: 'image', url: image.imageUrl, hint: image.imageHint, description: image.description });
    }
  };

  if (isUserLoading || !user) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="hidden sm:block">
            <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ''} />
            <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <Textarea
              placeholder="What's on your mind?"
              className="bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {media && (
                <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-lg border">
                    <Image src={media.url} alt={media.description} fill className="object-cover" data-ai-hint={media.hint} />
                     <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={() => setMedia(null)}>
                        <X className="h-4 w-4" />
                     </Button>
                </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={handleSelectImage}>
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span className="sr-only">Add image</span>
                </Button>
                <Button variant="ghost" size="icon" disabled>
                  <Video className="h-5 w-5 text-destructive" />
                  <span className="sr-only">Add video</span>
                </Button>
              </div>
              <Button onClick={handlePost} className="bg-accent hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Dummy X icon for the cancel button
const X = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
