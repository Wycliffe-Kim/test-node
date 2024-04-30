import { Record } from 'immutable';

export const immutableTest = () => {
  const d = Record({ a: 1, b: { test: 1 } })();
  console.log(d.set('a', 3).set('b', { test: 3 }).toJSON());
};
