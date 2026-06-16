import type { CollectionAfterReadHook } from 'payload'

export const populateUpcomingEvent: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.hero) {
    try {
      const posts = await payload.find({
        collection: 'posts',
        where: {
          and: [
            {
              type: {
                equals: 'event',
              },
            },
            {
              eventDate: {
                greater_than_equal: new Date().toISOString(),
              },
            },
          ],
        },
        sort: 'eventDate',
        limit: 1,
      })

      if (posts.docs.length > 0) {
        doc.hero.upcomingEvent = posts.docs[0]
      }
    } catch (err) {
      payload.logger.error(`Error populating upcoming event for hero: ${err}`)
    }
  }

  return doc
}
