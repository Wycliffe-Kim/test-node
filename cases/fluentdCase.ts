/*
 * Copyright (C) 2023 nota inc. All rights reserved.
 * This source code is the property of nota inc. and is protected by copyright law. THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY TRANSFER OF OWNERSHIP, COPYRIGHT OR ANY RIGHTS INCLUDING BUT NOT LIMITED TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 * Unauthorized disclosure, reproduction, modification, distribution, or commercial use of all or any part of this source code without prior written consent from Nota Inc. is strictly prohibited.
 * This source code is provided "as is" and without any warranty, express or implied.
 * Nota Inc. shall not be liable for any damages arising from the use of this source code.
 * For inquiries regarding the use of this source code, please contact Nota Inc. at:
 * Email: contact@nota.ai
 */
import { createFluentSender } from 'fluent-logger';
import { generateRandomNumber } from '../functions';

export const fluentdCase = () => {
  console.log('----- fluentdCase -----');

  const sender = createFluentSender('site-configuration', {
    host: 'localhost',
    port: 8888,
    timeout: 3.0,
    reconnectInterval: 600000, // 10 minutes
  });

  setInterval(() => {
    const titles = ['ldm-streaming', 'event-timeline'];
    const users = [1, 2, 3, 4, 5];

    const title = titles[generateRandomNumber(0, 1, true)];
    const user = users[generateRandomNumber(0, 4, true)];

    sender.emit({
      title,
      user,
    });
  }, 1000);
};
