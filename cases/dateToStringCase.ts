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

export const dateToStringCase = () => {
  const date = new Date();

  console.log('----- dateToStringCase -----');
  console.log(dateToString(date));
  console.log(dateToString(date, { containMilliseconds: true }));
  console.log(dateToString(date, { isIso: true }));
  console.log(dateToString(date, { isIso: true, containMilliseconds: true }));

  console.log(date.getFullYear(), date.getUTCFullYear());
  console.log(date.getMonth(), date.getUTCMonth());
  console.log(date.getDate(), date.getUTCDate());
  console.log(date.getHours(), date.getUTCHours());
  console.log(date.getMinutes(), date.getUTCMinutes());
  console.log(date.getSeconds(), date.getUTCSeconds());
  console.log(date.getMilliseconds(), date.getUTCMilliseconds());
};
