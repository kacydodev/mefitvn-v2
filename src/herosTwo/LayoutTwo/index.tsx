'use client';

import { useHeaderTheme } from '@/providers/HeaderTheme';
import React, { useEffect } from 'react';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { formatDistance } from 'date-fns';

export const LayoutTwo: React.FC<Page['heroTwo'][0]> = ({
  links,
  richText,
  upcomingEvent,
  topLeftImage,
  topRightImage,
  bottomLeftImage,
  bottomRightImage,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  const eventWithNewDate =
    upcomingEvent && typeof upcomingEvent === 'object'
      ? {
          ...upcomingEvent,
          eventDate: formatDistance(
            new Date(upcomingEvent.eventDate),
            new Date(),
          ),
        }
      : null;

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  const mediaPlaceholder = 'https://placehold.co/400x400';
  // console.log(medias)

  const imagePosition = {
    topLeftImage: 'col-start-1 row-start-1 justify-self-end mr-16',
    topRightImage: 'col-start-3 row-start-1 justify-self-start ml-16',
    bottomLeftImage: 'col-start-1 row-start-2 self-end justify-self-end ml-16',
    bottomRightImage:
      'col-start-3 row-start-2 self-end justify-self-start mr-16',
  };

  return (
    <section className='container grid grid-cols-[1fr_auto_1fr] gap-y-24 md:gap-x-4'>
      <article className='col-start-2 row-span-2 md:max-w-80 lg:max-w-146 space-y-8 text-center [&_h1]:md:text-3xl [&_h1]:lg:text-5xl'>
        {/* Upcoming Event */}
        {eventWithNewDate && typeof eventWithNewDate === 'object' && (
          <p
            className={`
          flex items-center gap-2 w-fit h-fit rounded-full text-[0.65rem] italic text-xs lg:text-sm
          before:w-2.25 before:h-2.25 before:rounded-full before:bg-success
          `}
          >
            {`${eventWithNewDate.title} in ${eventWithNewDate.eventDate}`}
          </p>
        )}
        {richText && <RichText data={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          // <ul className='self-center flex md:justify-start gap-4'>
          <ul className='flex gap-4 justify-center'>
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              );
            })}
          </ul>
        )}
      </article>
      <Media
        resource={topLeftImage}
        className={`${imagePosition['topLeftImage']} lg:w-46 lg:h-46`}
        imgClassName='object-cover rounded-lg'
      />
      <Media
        resource={topRightImage}
        className={`${imagePosition['topRightImage']} lg:w-46 lg:h-46`}
        imgClassName='object-cover rounded-lg'
      />
      <Media
        resource={bottomLeftImage}
        className={`${imagePosition['bottomLeftImage']} lg:w-46 lg:h-46`}
        imgClassName='object-cover rounded-lg'
      />
      <Media
        resource={bottomRightImage}
        className={`${imagePosition['bottomRightImage']} lg:w-46 lg:h-46`}
        imgClassName='object-cover rounded-lg'
      />
    </section>
  );
};
