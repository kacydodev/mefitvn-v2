import React from 'react';
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';

export const ThreeCardsLayout: React.FC = (props) => {
  const cards = props?.threeCardsLayout;

  if (!props) return null;

  return (
    <section className='container prose md:prose-md dark:prose-invert content-fit'>
      {/*<pre>{JSON.stringify(props, null, 2)}</pre>*/}
      <h2 className=''>{props.title}</h2>
      <article className='grid grid-rows-3 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 gap-6 lg:gap-12'>
        {Array.isArray(cards) &&
          cards.length > 0 &&
          cards.map(({ id, image, richText }) => {
            return (
              <div
                key={id}
                className='grid grid-cols-[auto_1fr] items-center lg:items-start gap-6'
              >
                <Media
                  resource={image}
                  className=''
                  imgClassName='w-24 lg:w-32 h-auto'
                />
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className='mx-0! lg:mt-12'
                  />
                )}
              </div>
            );
          })}
      </article>
    </section>
  );
};
