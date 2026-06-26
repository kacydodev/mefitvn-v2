import type { CollectionConfig } from 'payload';
import { editor } from '@/access/editor';
import { admin } from '@/access/admin';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: editor,
    create: admin,
    delete: admin,
    read: editor,
    update: editor,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      defaultValue: 'editor',
    },
  ],
  timestamps: true,
};
