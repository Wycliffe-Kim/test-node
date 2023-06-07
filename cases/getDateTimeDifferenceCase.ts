/*
 * Copyright (C) 2023 nota inc. All rights reserved.
 * This source code is the property of nota inc. and is protected by copyright law. THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY TRANSFER OF OWNERSHIP, COPYRIGHT OR ANY RIGHTS INCLUDING BUT NOT LIMITED TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 * Unauthorized disclosure, reproduction, modification, distribution, or commercial use of all or any part of this source code without prior written consent from Nota Inc. is strictly prohibited.
 * This source code is provided "as is" and without any warranty, express or implied.
 * Nota Inc. shall not be liable for any damages arising from the use of this source code.
 * For inquiries regarding the use of this source code, please contact Nota Inc. at:
 * Email: contact@nota.ai
 */
import moment from 'moment';

type ResultFormat =
  | 'AS_YEARS'
  | 'AS_MONTHS'
  | 'AS_WEEKS'
  | 'AS_DAYS'
  | 'AS_HOURS'
  | 'AS_MINUTES'
  | 'AS_SECONDS'
  | 'AS_MILLISECONDS';

type GetDateDifferenceOptions = {
  startDateTime: string | Date;
} & Partial<{
  endDateTime: string | Date;
  resultFormat: ResultFormat;
}>;

const getDateTimeDifference = (options: GetDateDifferenceOptions) => {
  const { startDateTime, endDateTime, resultFormat } = options;
  const _startDateTime = moment(startDateTime);
  const _endDateTime = moment(endDateTime ? endDateTime : new Date());
  const _resultFormat: ResultFormat = resultFormat
    ? resultFormat
    : 'AS_MILLISECONDS';
  const _resultFormatString = _resultFormat
    .split('_')
    .reduce(
      (result, current, i) =>
        (result +=
          i === 0
            ? current.toLowerCase()
            : current.charAt(0).toUpperCase() + current.slice(1).toLowerCase()),
      '',
    ) as
    | 'asMilliseconds'
    | 'asSeconds'
    | 'asMinutes'
    | 'asHours'
    | 'asDays'
    | 'asWeeks'
    | 'asMonths'
    | 'asYears';

  return moment
    .duration(_endDateTime.diff(_startDateTime))
    [_resultFormatString]() as number;
};

export const getDateTimeDifferenceCase = () => {
  const result = getDateTimeDifference({
    startDateTime: '2023-06-01',
    resultFormat: 'AS_YEARS',
  });

  console.log(result);
};
