import { movingAverages } from '../functions';

export const movingAverageCase = () => {
  console.log('----- movingAverageCase -----');

  const dynamicWeightedResult = movingAverages.dynamicWeighted(
    [1, 2, 3, 4, 5],
    3,
    false,
  );
  const exponentialResult = movingAverages.exponential([1, 2, 3, 4, 5], 3);
  const simpleResult = movingAverages.simple([1, 2, 3, 4, 5], 3);
  const smoothedResult = movingAverages.smoothed([1, 2, 3, 4, 5], 3);
  const weightedResult = movingAverages.weighted([1, 2, 3, 4, 5], 3);

  console.log('dynamicWeightedResult', dynamicWeightedResult);
  console.log('exponentialResult', exponentialResult);
  console.log('simpleResult', simpleResult);
  console.log('smoothedResult', smoothedResult);
  console.log('weightedResult', weightedResult);
};
