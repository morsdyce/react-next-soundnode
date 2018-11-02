import { reduce } from 'lodash/fp';

export const reduceWithIndex = reduce.convert({ cap: false });
