/*
 * Copyright (C) 2024 nota inc. All rights reserved.
 * This source code is the property of nota inc. and is protected by copyright law. THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY TRANSFER OF OWNERSHIP, COPYRIGHT OR ANY RIGHTS INCLUDING BUT NOT LIMITED TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 * Unauthorized disclosure, reproduction, modification, distribution, or commercial use of all or any part of this source code without prior written consent from Nota Inc. is strictly prohibited.
 * This source code is provided "as is" and without any warranty, express or implied.
 * Nota Inc. shall not be liable for any damages arising from the use of this source code.
 * For inquiries regarding the use of this source code, please contact Nota Inc. at:
 * Email: contact@nota.ai
 */

import { pipe, when } from 'ramda';
import { replace } from 'string-ts';

export const makeUrlFromEndpoint = (endpoint: string) => {
  const removeMethod = when(
    (endpoint: string) => /GET|POST|PATCH|PUT|DELETE/g.test(endpoint),
    (endpoint) => replace(endpoint, /GET|POST|PATCH|PUT|DELETE/g, ''),
  );

  const make = pipe(removeMethod, (endpoint) => replace(endpoint, '@', ''));

  return make(endpoint);
};

const endpoint = '@/api/v1/users';

console.log(makeUrlFromEndpoint(endpoint));
console.log(makeUrlFromEndpoint('GET@/api/v1/users'));
console.log(makeUrlFromEndpoint('POST@/api/v1/users'));
console.log(makeUrlFromEndpoint('PATCH@/api/v1/users'));
console.log(makeUrlFromEndpoint('PUT@/api/v1/users'));
console.log(makeUrlFromEndpoint('DELETE@/api/v1/users'));
