import {
  EventBlockListRequest,
  SafeCrossingEventBlock,
  SafeCrossingEventSeverity,
} from '../types';
import { generateRandomNumber } from './generateRandomNumber';
import { secondsToMilliseconds } from './secondsToMilliseconds';

export const generateRandomEventBlockList = ({
  blockInterval,
  startTime,
  endTime,
}: EventBlockListRequest) => {
  const eventBlockList: SafeCrossingEventBlock[] = [];

  const startTimeInMs = new Date(startTime).getTime();
  const _startTime = new Date(startTimeInMs - (startTimeInMs % blockInterval));

  let currentTime = new Date(_startTime).getTime();
  const endTimeInMs = new Date(endTime).getTime();

  while (currentTime < endTimeInMs) {
    if (generateRandomNumber(0, 1) === 1) {
      const startTime = new Date(currentTime).toISOString();
      const endTime = new Date(
        currentTime + secondsToMilliseconds(blockInterval),
      ).toISOString();

      eventBlockList.push({
        startTime,
        endTime,
        severity: generateRandomNumber(0, 5) as SafeCrossingEventSeverity,
      });
    }

    currentTime += secondsToMilliseconds(blockInterval);
  }

  return eventBlockList;
};
