import { Field } from 'payload';

export const layoutOneMedias: Field = {
  type: 'row',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'layoutOne',
      },
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'layoutOne',
      },
    },
  ],
};

export const layoutTwoMedias: Field = {
  type: 'row',
  fields: [
    {
      name: 'topLeftImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'layoutTwo',
        width: '50%',
      },
    },
    {
      name: 'topRightImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'layoutTwo',
        width: '50%',
      },
    },
    {
      name: 'bottomLeftImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'layoutTwo',
        width: '50%',
      },
    },
    {
      name: 'bottomRightImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'layoutTwo',
        width: '50%',
      },
    },
  ],
};
