import { Block, Field } from 'payload';
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { upcomingEvent } from '@/fields/upcomingEvent';
import { featuredVideo } from '@/fields/featuredVideo';
import {
  layoutOneMedias,
  layoutTwoMedias,
} from '@/herosTwo/components/mediasConfig';
import { linkGroup } from '@/fields/linkGroup/config';

export const layoutTwo: Block = {
  slug: 'layoutTwo',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'layoutTwo',
      options: [
        {
          label: 'Layout One',
          value: 'layoutOne',
        },
        {
          label: 'Layout Two',
          value: 'layoutTwo',
        },
      ],
    },
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
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'medias',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    layoutOneMedias,
    layoutTwoMedias,
    upcomingEvent,
    featuredVideo,
  ],
};
