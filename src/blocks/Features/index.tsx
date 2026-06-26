import React from 'react';
import type { Block } from '@/payload-types';

const threeCardLayout = () => {
  return <div>Three Cards</div>;
};

const layouts = {
  threeCardLayout: threeCardLayout,
};

export const FeaturesBlock: React.FC<Block['features']> = (props) => {
  const { layout } = props;

  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
