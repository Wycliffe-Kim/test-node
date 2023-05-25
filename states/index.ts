import { createState } from '../functions';
import { SafeCrossingEventBlock } from '../types';

export const [getStartTime, setStartTime] = createState(
  new Date().toISOString(),
);

export const [getEndTime, setEndTime] = createState(new Date().toISOString());

export const [getIsOnLoad, setIsOnLoad] = createState(true);

export const [getIsUseCachedEventBlockList, setIsUseCachedEventBlockList] =
  createState(false);

export const [getCachedEventBlockList, setCachedEventBlockList] = createState<
  SafeCrossingEventBlock[]
>([]);

export const [getEventBlockList, setEventBlockList] = createState<
  SafeCrossingEventBlock[]
>([]);
