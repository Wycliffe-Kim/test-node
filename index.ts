/*
 * Copyright (C) 2023 nota inc. All rights reserved.
 * This source code is the property of nota inc. and is protected by copyright law. THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY TRANSFER OF OWNERSHIP, COPYRIGHT OR ANY RIGHTS INCLUDING BUT NOT LIMITED TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 * Unauthorized disclosure, reproduction, modification, distribution, or commercial use of all or any part of this source code without prior written consent from Nota Inc. is strictly prohibited.
 * This source code is provided "as is" and without any warranty, express or implied.
 * Nota Inc. shall not be liable for any damages arising from the use of this source code.
 * For inquiries regarding the use of this source code, please contact Nota Inc. at:
 * Email: contact@nota.ai
 */

type DateToStringOptions = Partial<{
  isIso: boolean;
  containMilliseconds: boolean;
}>;
const dateToString = (
  date: Date,
  options: DateToStringOptions = {
    isIso: false,
    containMilliseconds: false,
  },
) => {
  const { isIso, containMilliseconds } = options;
  const year = `${date.getFullYear()}`.padStart(4, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const min = `${date.getMinutes()}`.padStart(2, '0');
  const seconds = `${date.getSeconds()}`.padStart(2, '0');
  const milliseconds = `${date.getMilliseconds()}`.padStart(3, '0');

  return isIso === true
    ? containMilliseconds === true
      ? date.toISOString()
      : `${date.toISOString().substring(0, 19)}Z`
    : containMilliseconds === true
    ? `${year}-${month}-${day} ${hour}:${min}:${seconds}.${milliseconds}`
    : `${year}-${month}-${day} ${hour}:${min}:${seconds}`;
};

const date = new Date();
console.log(dateToString(date));
console.log(dateToString(date, { containMilliseconds: true }));
console.log(dateToString(date, { isIso: true }));
console.log(dateToString(date, { isIso: true, containMilliseconds: true }));
