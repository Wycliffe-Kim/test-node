import { SafeCrossingEventSeverity } from './SafeCrossingSeverity';

export type SafeCrossingEventBlock = {
  startTime: string;
  endTime: string;
  severity: SafeCrossingEventSeverity;
};

export const SafeCrossingEventBlock = {
  nullValue: (): SafeCrossingEventBlock => ({
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    severity: 0,
  }),
  isValid: (block: object): block is SafeCrossingEventBlock => {
    if (!('startTime' in block && 'endTime' in block && 'severity' in block)) {
      return false;
    }

    const _block = block as SafeCrossingEventBlock;

    return (
      typeof _block.startTime === 'string' &&
      typeof _block.endTime === 'string' &&
      SafeCrossingEventSeverity.isValid(_block.severity)
    );
  },
};
