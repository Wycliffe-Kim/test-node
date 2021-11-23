import _ from 'lodash';

class Person {
  name: string;
  country: string;

  constructor(name, country) {
    this.name = name;
    this.country = country;
  }
}

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

const data = _(persons).map(getCountry).reduce(gatherStats, {});
console.log(data);