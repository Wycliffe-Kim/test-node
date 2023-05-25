import { DEFAULT_BUCKET_INTERVAL } from '../constants';

type Param = Partial<{
  currentTime: Date;
  bucketInterval: number;
}>;

export const getCurrentQueryTime = (param?: Param) => {
  const { currentTime, bucketInterval }: Required<Param> = {
    currentTime: param?.currentTime || new Date(),
    bucketInterval: param?.bucketInterval || DEFAULT_BUCKET_INTERVAL,
  };

  return new Date(
    Math.floor(
      (currentTime ? currentTime : new Date()).getTime() /
        1000 /
        60 /
        bucketInterval,
    ) *
      bucketInterval *
      60 *
      1000,
  );
};
