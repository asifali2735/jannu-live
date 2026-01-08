'use client';

import React from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { MainLayout } from '@/components/layout/main-layout';
import CreatePost from '@/components/features/post/create-post';
import PostCard from '@/components/features/post/post-card';
import AdBanner from '@/components/features/ads/ad-banner';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const adBannerImage = PlaceHolderImages.find(img => img.id === 'ad-banner-1');
  const firestore = useFirestore();
  const { user } = useUser();

  const postsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'posts'), orderBy('createdAt', 'desc')) : null),
    [firestore]
  );
  const { data: posts, isLoading } = useCollection(postsQuery);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <h1 className="text-3xl font-bold font-headline">Home Feed</h1>
        {user && <CreatePost />}
        <div className="space-y-4">
          {isLoading && (
            <>
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </>
          )}
          {posts?.map((post, index) => (
            <React.Fragment key={post.id}>
              <PostCard post={post} />
              {index === 1 && adBannerImage && <AdBanner adImage={adBannerImage} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
