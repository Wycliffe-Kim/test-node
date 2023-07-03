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
