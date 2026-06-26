'use client';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import React, { useEffect } from 'react';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { formatDistance } from 'date-fns';

export const LayoutOne: React.FC<Page['heroTwo'][0]> = ({
  links,
  media,
  background,
  richText,
  upcomingEvent,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  const eventDate =
    upcomingEvent && typeof upcomingEvent === 'object'
      ? formatDistance(new Date(upcomingEvent.eventDate), new Date())
      : '';
  // const eventDate = formatDistance(upcomingEvent?.eventDate, new Date())

  useEffect(() => {
    setHeaderTheme('dark');
  });

  return (
    <section
      className='relative -mt-[8.5rem] flex items-center justify-center text-white'
      data-theme='dark'
    >
      {/* <div className='container pt-[8.5rem] flex flex-col-reverse md:grid md:grid-cols-[2fr_1fr] gap-x-12 gap-y-8 items-center justify-center'> */}
      {/* <div className='container pt-[8.5rem] flex flex-col-reverse md:grid md:grid-cols-[3fr_2fr] gap-x-12 gap-y-8 items-center *:place-self-center'> */}
      <div className='container pt-[8.5rem] flex flex-col-reverse md:flex-row md:gap-x-12 lg:gap-x-24 gap-y-8 items-center justify-center'>
        <div className='md:max-w-96 lg:max-w-146 space-y-8 md:text-left [&_h1]:text-4xl'>
          {richText && <RichText data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className='self-center flex md:justify-start gap-4'>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
          {/* Upcoming Event */}
          {upcomingEvent && (
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success text-xs italic lg:text-sm debug'>
              <span className='bg-green-500 w-3 h-3 rounded-full'></span>{' '}
              {`${upcomingEvent?.title} in ${eventDate}`}
            </div>
          )}
        </div>
        <Media resource={media} className='w-72 h-auto' />
      </div>

      <div className='min-h-[80vh] select-none'>
        {background && typeof background === 'object' && (
          <Media
            fill
            imgClassName='-z-10 object-fit'
            priority
            resource={background}
          />
        )}
      </div>
    </section>
  );
};
