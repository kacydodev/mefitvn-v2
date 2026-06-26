import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Button } from '@payloadcms/ui';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/payload-types';
import { formatRelative } from 'date-fns';

const PostsCount = async () => {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'posts',
    sort: 'updateAt',
    depth: 2,
    populate: {
      updatedBy: true,
    },
  });
  const latestDraft = posts.docs.find((post: Post) => post._status === 'draft');
  const recentlyPublished = posts.docs.find(
    (post: Post) => post._status === 'published',
  );

  const mostRecentPost = posts.docs[0];
  const authors = mostRecentPost?.populatedAuthors
    ? mostRecentPost?.populatedAuthors.map((author) => author.name).join(', ')
    : undefined;

  function truncateByWords(str: string, wordLimit: number) {
    const words = str.split(' '); // Split into an array of words
    if (words.length <= wordLimit) return str;

    return words.slice(0, wordLimit).join(' ') + '...';
  }

  console.log(posts);

  return (
    <div className='card posts-count-container'>
      <div className='post-count-content'>
        <p>Total posts:</p>
        <p>{posts.totalDocs}</p>
        <p>Recently published:</p>
        <Link href={`/admin/collections/posts/${recentlyPublished?.id}`}>
          {recentlyPublished && truncateByWords(recentlyPublished.title, 4)}
        </Link>
        <p>Latest draft:</p>
        <Link href={`/admin/collections/posts/${latestDraft?.id}`}>
          {latestDraft && formatRelative(latestDraft.updatedAt, new Date())}
        </Link>
      </div>
      <Link href={`/admin/collections/posts/create`}>
        <button>
          <PlusIcon size={16} /> New Post
        </button>
      </Link>
    </div>
  );

  return (
    <div className='card posts-count-container'>
      <div className='post-count-header'>
        <h3>Posts</h3>
        <Link href={`/admin/collections/posts/create`}>
          <Button size='xsmall' icon={<PlusIcon />}></Button>
        </Link>
      </div>
      <div className='post-count-content'>
        <p>Total:</p>
        <p>{posts.totalDocs}</p>
        {/*TODO: Clickable author name link to posts created by that author */}
        <p style={{ gridColumn: 'span 2' }}>
          Most recent post by <i>{authors}</i>
        </p>
      </div>
    </div>
  );
};

export default PostsCount;
