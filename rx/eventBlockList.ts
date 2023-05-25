import { EventBlockListRequest, SafeCrossingEventBlock } from '../types';
import { Subject } from 'rxjs';

export const eventBlockListRequest$ = new Subject<EventBlockListRequest>();

export const eventBlockListResponse$ = new Subject<SafeCrossingEventBlock[]>();
