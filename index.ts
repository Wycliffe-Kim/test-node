/*
 * Copyright (C) 2024 nota inc. All rights reserved.
 * This source code is the property of nota inc. and is protected by copyright law. THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY TRANSFER OF OWNERSHIP, COPYRIGHT OR ANY RIGHTS INCLUDING BUT NOT LIMITED TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 * Unauthorized disclosure, reproduction, modification, distribution, or commercial use of all or any part of this source code without prior written consent from Nota Inc. is strictly prohibited.
 * This source code is provided "as is" and without any warranty, express or implied.
 * Nota Inc. shall not be liable for any damages arising from the use of this source code.
 * For inquiries regarding the use of this source code, please contact Nota Inc. at:
 * Email: contact@nota.ai
 */
import { Either } from 'monet';

const isString = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0;

export const isValidUrl = (url: unknown, protocol?: string) =>
  isString(url) &&
  Either.fromTry(() => {
    const _url = new URL(url);
    if (protocol !== undefined) {
      if (!_url.protocol.includes(protocol)) {
        throw Error(
          `protocol is not same! (_url.protocol=${_url.protocol}, protocol=${protocol})`,
        );
      }
    }
  }).isRight();

console.log(
  isValidUrl('rtsp://username:43434@34.64.33.111:5444/stream', 'rtsp'),
);
