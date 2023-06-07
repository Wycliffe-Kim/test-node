/*
 * Copyright (C) 2023 nota inc. All rights reserved.
 * This source code is the property of nota inc. and is protected by copyright law. THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY TRANSFER OF OWNERSHIP, COPYRIGHT OR ANY RIGHTS INCLUDING BUT NOT LIMITED TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 * Unauthorized disclosure, reproduction, modification, distribution, or commercial use of all or any part of this source code without prior written consent from Nota Inc. is strictly prohibited.
 * This source code is provided "as is" and without any warranty, express or implied.
 * Nota Inc. shall not be liable for any damages arising from the use of this source code.
 * For inquiries regarding the use of this source code, please contact Nota Inc. at:
 * Email: contact@nota.ai
 */
import { chain, concat } from 'lodash';
import {
  DEFAULT_BUCKET_INTERVAL,
  DEFAULT_EVENT_BLOCK_INTERVAL,
} from '../constants';
import {
  generateRandomEventBlockList,
  getCurrentQueryTime,
  minutesToMilliseconds,
} from '../functions';
import { eventBlockListRequest$, eventBlockListResponse$ } from '../rx';
import {
  getCachedEventBlockList,
  getEndTime,
  getEventBlockList,
  getIsOnLoad,
  getIsUseCachedEventBlockList,
  getStartTime,
  setCachedEventBlockList,
  setEndTime,
  setEventBlockList,
  setIsOnLoad,
  setIsUseCachedEventBlockList,
  setStartTime,
} from '../states';

export const aiSafeCrossingEventBlockList = () => {
  console.log('----- aiSafeCrossingEventBlockList -----');

  eventBlockListRequest$.subscribe((eventBlockListRequest) => {
    const eventBlockList = generateRandomEventBlockList(eventBlockListRequest);
    eventBlockListResponse$.next(eventBlockList);
  });

  eventBlockListResponse$.subscribe((eventBlockList) => {
    const currentTime = new Date();
    const queryTime = getCurrentQueryTime({ currentTime });

    const isOnTime =
      currentTime.getTime() % minutesToMilliseconds(DEFAULT_BUCKET_INTERVAL) <
      1000;
    const startTime = isOnTime
      ? // 버킷 단위 시간일 경우에는 queryTime 55분 전부터 조회
        new Date(
          queryTime.getTime() -
            minutesToMilliseconds(60 - DEFAULT_BUCKET_INTERVAL),
        ).toISOString()
      : // 버킷 단위 시간이 아닐 경우에는 queryTime부터 조회
        queryTime.toISOString();
    const endTime = currentTime.toISOString();
    if (!getIsOnLoad()) {
      setStartTime(startTime);
      setEndTime(endTime);
    }

    const filteredEventBlockList = chain(eventBlockList)
      .filter(
        ({ startTime, endTime }) =>
          // queryTime보다 이전 시간의 이벤트 블록만 필터링
          new Date(endTime).getTime() <= queryTime.getTime() &&
          new Date(startTime).getTime() >=
            queryTime.getTime() -
              minutesToMilliseconds(60 - DEFAULT_BUCKET_INTERVAL),
      )
      .value();

    setEventBlockList(
      getIsUseCachedEventBlockList()
        ? concat(
            chain(getCachedEventBlockList())
              .filter(
                ({ startTime, endTime }) =>
                  // queryTime보다 이전 시간의 이벤트 블록만 필터링
                  new Date(endTime).getTime() <= queryTime.getTime() &&
                  new Date(startTime).getTime() >=
                    queryTime.getTime() -
                      minutesToMilliseconds(60 - DEFAULT_BUCKET_INTERVAL),
              )
              .value(),
            eventBlockList,
          )
        : eventBlockList,
    );

    // 캐싱된 데이터를 사용하지 않는 경우, 즉 처음 로드 시거나, 버킷 인터벌 단위 시간일 경우
    // 받아온 데이터 중 queryTime 이전의 데이터만 필터링하여 캐싱
    if (!getIsUseCachedEventBlockList()) {
      setCachedEventBlockList(filteredEventBlockList);
    }

    if (getIsOnLoad()) {
      // 처음 로드 시에는 캐싱된 데이터를 사용하지 않음.
      setIsOnLoad(false);
      setIsUseCachedEventBlockList(false);
    } else {
      // 처음 로드가 아닐 경우, 캐싱된 데이터를 사용할지 여부를 버킷 인터벌 단위 시간에 따라 결정
      setIsUseCachedEventBlockList(!isOnTime);
    }

    console.log('------------------');
    console.log('cachedEventBlockList', getCachedEventBlockList());
    console.log('saved eventBlockList', getEventBlockList());
    console.log('eventBlockList', eventBlockList);
    console.log('queryTime', queryTime);
    console.log('currentTime', currentTime);
    console.log('startTime', getStartTime());
    console.log('endTime', getEndTime());
    console.log('isOnTime', isOnTime);
    console.log('isUseCachedEventBlockList', getIsUseCachedEventBlockList());
  });

  const currentTime = new Date();
  const queryTime = getCurrentQueryTime({
    currentTime,
  });
  const startTime = new Date(
    queryTime.getTime() - minutesToMilliseconds(60 - DEFAULT_BUCKET_INTERVAL),
  );

  setStartTime(startTime.toISOString());
  setEndTime(currentTime.toISOString());

  setInterval(() => {
    eventBlockListRequest$.next({
      startTime: getStartTime(),
      endTime: getEndTime(),
      blockInterval: DEFAULT_EVENT_BLOCK_INTERVAL,
    });
  }, 1000);
};
