import type { CollectionBeforeChangeHook } from 'payload';

export const ensureSingleDefault: CollectionBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (data.default === true) {
    // Find any other location that is currently set as default
    const otherDefaults = await req.payload.find({
      collection: 'locations',
      where: {
        and: [
          {
            default: {
              equals: true,
            },
          },
          {
            id: {
              not_equals: originalDoc?.id,
            },
          },
        ],
      },
    });

    if (otherDefaults.docs.length > 0) {
      await Promise.all(
        otherDefaults.docs.map((doc) =>
          req.payload.update({
            collection: 'locations',
            id: doc.id,
            data: {
              default: false,
            },
            req, // Pass req to ensure access control and transaction consistency
          }),
        ),
      );
    }
  }

  return data;
};
