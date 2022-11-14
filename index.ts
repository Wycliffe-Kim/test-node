import moment from 'moment-timezone';

const splitDateTimeString = (dateTime: string) => {
  const utc = moment.utc(dateTime).toDate();
  const _dateTime = moment(utc).local().format('YYYY-MM-DDTHH:mm:ss');
  const date = _dateTime.split('T')[0];
  const time = _dateTime.split('T')[1].split('.')[0];
  const hour = `${+time.split(':')[0]}`.padStart(2, '0');
  const min = `${time.split(':')[1]}`.padStart(2, '0');
  const sec = `${time.split(':')[2]}`.padStart(2, '0');

  return { date, hour, min, sec };
};

const date = '2022-09-19T04:59:00';
const utc = moment.utc(date).toDate();
console.log(utc);

const d = moment(utc).local().format('YYYY-MM-DDThh:mm:ss');
console.log(d);

console.log(splitDateTimeString(date));
