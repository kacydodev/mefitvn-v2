import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Button } from '@payloadcms/ui'
import {PlusIcon } from 'lucide-react'
import Link from 'next/link'

const PostsCount = async () => {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    sort: 'createdAt',
    depth: 1
  })
  const mostRecentPost = posts.docs[0]
  const authors =
    mostRecentPost?.populatedAuthors ? mostRecentPost?.populatedAuthors
      .map((author) => author.name)
      .join(', ') : undefined

  return (
    <div className='custom-widget'>
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
  )
}

export default PostsCount
