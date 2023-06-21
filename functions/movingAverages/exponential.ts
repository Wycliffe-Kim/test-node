import { dynamicWeighted } from './dynamicWeighted';

export const exponential = (data: number[], size: number) =>
  dynamicWeighted(data, 2 / (size + 1), false);
