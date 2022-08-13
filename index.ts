import _ from 'lodash';

const endTime = new Date();

const hourToMs = (hour: number) => hour * 60 * 60 * 1000;

const msToHour = (ms: number) => ms / (60 * 60 * 1000);

const startTime = new Date(endTime.getTime() - hourToMs(1));

console.log(endTime, startTime);

console.log('test merge 12');
