// Smoothed moving average

import { dynamicWeighted } from './dynamicWeighted';

export const smoothed = (data: number[], size: number, times = 1) =>
  dynamicWeighted(data, times / size, true);
