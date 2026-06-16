import type { CollectionAfterReadHook } from 'payload'

export const populateUpcomingEvent: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.hero) {
    try {
      const posts = await payload.find({
        collection: 'posts',
        limit: 1,
        sort: '-publishedAt',
        where: {
          '_status': {
            equals: 'published',
          },
          'categories.slug': {
            in: ['news', 'News'],
          },
        },
      })

      if (posts.docs.length > 0) {
        doc.hero.latestNews = posts.docs[0].id
      }
    } catch (err) {
      payload.logger.error(`Error populating latest news for hero: ${err}`)
    }
  }

  return doc
}
