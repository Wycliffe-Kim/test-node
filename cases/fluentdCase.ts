import { createFluentSender } from 'fluent-logger';

export const fluentdCase = () => {
  console.log('----- fluentdCase -----');

  const sender = createFluentSender('site-configuration', {
    host: 'localhost',
    port: 8888,
    timeout: 3.0,
    reconnectInterval: 600000, // 10 minutes
  });

  sender.emit({
    title: 'ldm-streaming',
    user: 2,
  });

  sender.emit({
    title: 'event-timeline',
    user: 3,
  });
};
