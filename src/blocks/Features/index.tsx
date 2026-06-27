import React from 'react';
import type { Block } from '@/payload-types';
import { ThreeCardsLayout } from '@/blocks/Features/layouts/ThreeCardsLayout';

const features = {
  threeCardsLayout: ThreeCardsLayout,
};

export const FeaturesBlock: React.FC<Block['features']> = (props) => {
  const { layout } = props;

  if (!layout) return null;

  const FeaturesToRender = features[layout];

  return <FeaturesToRender {...props} />;
};
