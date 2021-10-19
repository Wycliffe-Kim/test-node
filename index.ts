import _ from 'lodash';
import { hashCode } from 'ts-utls';

function generateRandomNumber() {
  return Math.random() * 1000;
}

_.range(10).forEach(() => {
  const number = generateRandomNumber();
  console.log(`hashCode(${number}): ${hashCode(`${number}`)}`);
});