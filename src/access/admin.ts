import { Access, type AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const admin: isAuthenticated = ({ req }) => {
  return req.user?.role === 'admin'
}
