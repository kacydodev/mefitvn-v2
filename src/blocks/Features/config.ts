import { Block, Field } from 'payload';
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

const card: Field = {
  type: 'group',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: 'Content',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export const Features: Block = {
  slug: 'features',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'threeCardsLayout',
      options: [
        { label: 'Three Cards', value: 'threeCardsLayout' },
        { label: 'Four Cards', value: 'fourCardsLayout' },
        { label: 'Six Cards', value: 'sixCardsLayout' },
      ],
    },
    {
      name: 'threeCardsLayout',
      type: 'array',
      label: {
        singular: 'Card',
        plural: 'Cards',
      },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.layout === 'threeCardsLayout',
      },
      minRows: 3,
      maxRows: 3,
      fields: [card],
    },
  ],
};
