import { Block } from 'payload'

export const TrustedBrands: Block = {
  slug: 'trusted-brands',
  interfaceName: 'Trusted Brands',
  // TODO: put some description or group up by function
  fields: [
    {
      name: 'brands',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 3,
      maxRows: 5,
      required: true,
    },
  ],
}
