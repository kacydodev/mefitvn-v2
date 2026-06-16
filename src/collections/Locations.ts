import { CollectionConfig, slugField } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { ensureSingleDefault } from '../hooks/ensureSingleDefault'

export const Locations: CollectionConfig = {
  slug: 'locations',
  hooks: {
    beforeChange: [ensureSingleDefault],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'default',
      label: 'Set as default',
      type: 'checkbox',
      defaultValue: false,
    },
    slugField({
      position: undefined,
    }),
  ],
}
