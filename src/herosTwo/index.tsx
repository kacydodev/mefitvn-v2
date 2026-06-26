import React from 'react';
import type { Page } from '@/payload-types';
import { LayoutOne } from '@/herosTwo/LayoutOne';
import { LayoutTwo } from '@/herosTwo/LayoutTwo';

const layouts = {
  layoutOne: LayoutOne,
  layoutTwo: LayoutTwo,
};

function HeroTwo({ blocks }: { blocks: Page['heroTwo'] }) {
  const block = blocks?.[0];

  if (!block) return null;

  const { blockType } = block;

  if (blockType === 'layoutOne') {
    const layout = (block as any).layout || 'layoutOne';
    const HeroToRender = layouts[layout as keyof typeof layouts];

    if (HeroToRender) {
      return <HeroToRender {...(block as any)} />;
    }
  }

  if (blockType && blockType in layouts) {
    const HeroToRender = layouts[blockType as keyof typeof layouts];

    if (HeroToRender) {
      return <HeroToRender {...block} />;
    }
  }

  return null;
}

export default HeroTwo;
