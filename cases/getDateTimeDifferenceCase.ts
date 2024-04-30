import moment from 'moment';

type ResultFormat =
  | 'AS_YEARS'
  | 'AS_MONTHS'
  | 'AS_WEEKS'
  | 'AS_DAYS'
  | 'AS_HOURS'
  | 'AS_MINUTES'
  | 'AS_SECONDS'
  | 'AS_MILLISECONDS';

type GetDateDifferenceOptions = {
  startDateTime: string | Date;
} & Partial<{
  endDateTime: string | Date;
  resultFormat: ResultFormat;
}>;

const getDateTimeDifference = (options: GetDateDifferenceOptions) => {
  const { startDateTime, endDateTime, resultFormat } = options;
  const _startDateTime = moment(startDateTime);
  const _endDateTime = moment(endDateTime ? endDateTime : new Date());
  const _resultFormat: ResultFormat = resultFormat
    ? resultFormat
    : 'AS_MILLISECONDS';
  const _resultFormatString = _resultFormat
    .split('_')
    .reduce(
      (result, current, i) =>
        (result +=
          i === 0
            ? current.toLowerCase()
            : current.charAt(0).toUpperCase() + current.slice(1).toLowerCase()),
      '',
    ) as
    | 'asMilliseconds'
    | 'asSeconds'
    | 'asMinutes'
    | 'asHours'
    | 'asDays'
    | 'asWeeks'
    | 'asMonths'
    | 'asYears';

  return moment
    .duration(_endDateTime.diff(_startDateTime))
    [_resultFormatString]() as number;
};

export const getDateTimeDifferenceCase = () => {
  const result = getDateTimeDifference({
    startDateTime: '2023-06-01',
    resultFormat: 'AS_YEARS',
  });

  console.log('----- getDateTimeDifferenceCase -----');
  console.log(result);
};
