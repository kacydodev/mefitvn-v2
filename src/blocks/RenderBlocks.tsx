import React, { Fragment } from 'react';

import type { Page } from '@/payload-types';

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { TrustedBrandsBlock } from '@/blocks/TrustedBrands';
import { FeaturesBlock } from '@/blocks/Features';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // TODO: convert all block slug to kebab style
  'trusted-brands': TrustedBrandsBlock,
  features: FeaturesBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <Fragment key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </Fragment>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
