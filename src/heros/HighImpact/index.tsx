'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { format, formatDistance } from 'date-fns'
import { Circle } from 'lucide-react'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  background,
  richText,
  upcomingEvent,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  console.log(upcomingEvent)

  const eventDate = formatDistance(upcomingEvent?.eventDate, new Date())

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <section
      className='relative -mt-[8.5rem] flex items-center justify-center text-white'
      data-theme='dark'
    >
      <div className='container z-10 relative flex items-center justify-center gap-24'>
        <div className='max-w-[36.5rem] space-y-8 md:text-left [&_h1]:text-4xl'>
          {richText && <RichText data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className='flex md:justify-start gap-4'>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
          {/* Upcoming Event */}
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success text-sm italic'>
            <span className='bg-green-500 w-3 h-3 rounded-full'></span> {upcomingEvent?.title} in{' '}
            {eventDate}!
          </div>
        </div>
        <Media resource={media} imgClassName='w-72 h-auto' />
      </div>

      <div className='min-h-[80vh] select-none'>
        {background && typeof background === 'object' && (
          <Media fill imgClassName='-z-10 object-fit' priority resource={background} />
        )}
      </div>
    </section>
  )
}
