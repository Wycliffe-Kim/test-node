import _ from 'lodash';
// import R from 'ramda';
const R = require('ramda');

class Person {
  name: string;
  country: string;

  constructor(name, country) {
    this.name = name;
    this.country = country;
  }
}

const countryLens = R.lens(R.prop('country'), R.assoc('country'));

const persons: Person[] = [
  new Person('person1', 'US'),
  new Person('person2', 'US'),
  new Person('person3', 'Greece'),
  new Person('person4', 'Hungary'),
];

const getCountry = person => person.country;
const gatherStats = (stat, country) => {
  stat[country] = _.isUndefined(stat[country]) ? 1 : stat[country] + 1;
  return stat;
}

const data = _(persons).map(R.view(countryLens)).reduce(gatherStats, {});
console.log(data);