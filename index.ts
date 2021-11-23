import _ from 'lodash';

function sum(arr: any[], acc = 0) {
  if (_(arr).isEmpty()) {
    return 0;
  }

  return acc + _(arr).first() + sum(_(arr).slice(1).value());
}

console.log(sum([1, 2, 3, 4], 10));