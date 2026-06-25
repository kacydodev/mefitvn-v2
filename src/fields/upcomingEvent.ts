import { Field } from 'payload'

export const upcomingEvent: Field = {
  name: 'upcomingEvent',
  type: 'relationship',
  admin: {
    position: 'sidebar',
  },
  relationTo: 'posts',
  filterOptions: {
    type: {
      in: ['event'],
    },
    eventDate: {
      greater_than_equal: new Date().toISOString(),
    },
  },
}
