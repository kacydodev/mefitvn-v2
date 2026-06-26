import { layoutOne } from '@/herosTwo/LayoutOne/config';
import { Field } from 'payload';
import { layoutTwo } from '@/herosTwo/LayoutTwo/config';

export const heroTwo: Field = {
  name: 'heroTwo',
  type: 'blocks',
  blocks: [layoutOne, layoutTwo],
  required: true,
  maxRows: 1,
};
