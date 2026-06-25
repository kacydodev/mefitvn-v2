import type { CollectionBeforeValidateHook } from 'payload'

export const ensureFirstPageTitle: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation === 'create' && !data?.title) {
    const { totalDocs } = await req.payload.find({
      collection: 'pages',
      limit: 0,
      depth: 0,
    })

    if (totalDocs === 0) {
      return {
        ...data,
        title: 'Home',
      }
    }
  }

  return data
}
