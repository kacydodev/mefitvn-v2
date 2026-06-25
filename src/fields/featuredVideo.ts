import { Field } from 'payload'

export const featuredVideo: Field = {
  name: 'featuredVideo',
  type: 'upload',
  relationTo: 'media',
  admin: {
    condition: (data) => {
      return data?.mimeType?.includes('video')
    },
  },
  maxRows: 1,
}
