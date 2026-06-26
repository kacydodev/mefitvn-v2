import React from 'react';
import { Media } from '@/components/Media';
import { TrustedBrands } from '@/payload-types';

export const TrustedBrandsBlock: React.FC<TrustedBrands> = ({ brands }) => {
  return (
    <section className='container flex items-center justify-center gap-6 lg:gap-12'>
      {brands &&
        brands.map((brand) => {
          if (typeof brand === 'string') return null;
          return (
            <Media
              key={brand.id}
              resource={brand}
              className='opacity-75'
              imgClassName='max-h-6 lg:max-h-10'
            />
          );
        })}
    </section>
  );
};
