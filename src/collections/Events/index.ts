import { CollectionConfig, slugField } from 'payload';
import { editor } from '@/access/editor';
import { generatePreviewPath } from '@/utilities/generatePreviewPath';
import { populateAuthors } from '../Posts/hooks/populateAuthors';
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { Banner } from '@/blocks/Banner/config';
import { Code } from '@/blocks/Code/config';
import { MediaBlock } from '@/blocks/MediaBlock/config';
import { getSiblingData } from 'payload/shared';
import { addHours } from 'date-fns';

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: editor,
    delete: editor,
    read: editor,
    update: editor,
  },
  admin: {
    defaultColumns: ['title', 'eventDate', 'startTime', 'updatedAt', 'slug'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eventDate',
          type: 'date',
          required: true,
          defaultValue: () => new Date(),
          admin: {
            date: {
              pickerAppearance: 'dayOnly', // 'dayOnly' | 'timeOnly' | 'dayAndTime'
              displayFormat: 'eeee, dd/MM/yyyy', // Uses date-fns formatting rules
            },
          },
        },
        {
          name: 'location',
          type: 'relationship',
          required: true,
          relationTo: 'locations',
          defaultValue: async ({ req }) => {
            const defaultLocation = await req.payload.find({
              collection: 'locations',
              where: {
                default: {
                  equals: true,
                },
              },
              limit: 1,
            });

            return defaultLocation?.docs?.[0]?.id || null;
          },
          admin: {
            condition: (data) => data?.type === 'event',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startTime',
          type: 'date',
          required: true,
          // defaultValue: new Date(),
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'HH:mm',
            },
            width: '50%',
          },
        },
        {
          name: 'endTime',
          type: 'date',
          hooks: {
            beforeChange: [
              ({ siblingData, value }) => {
                if (!value && siblingData?.startTime) {
                  return addHours(new Date(siblingData?.startTime), 2);
                }
                return value;
              },
            ],
          },
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'hh:mm aa',
            },
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'priceVND',
      type: 'number',
      label: 'Price (VND)',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'entryPriceInclusive',
          label: 'Price includes entry fee',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'gearPriceInclusive',
          label: 'Price includes gear rental',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'eventContent',
      type: 'richText',
      label: 'Event Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ];
        },
      }),
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        // date: {
        //   pickerAppearance: 'dayAndTime',
        // },
        position: 'sidebar',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
      hooks: {
        beforeChange: [
          ({ value, req, operation }) => {
            if (operation === 'create' && !value && req.user) {
              return [req.user.id];
            }
            return value;
          },
        ],
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
