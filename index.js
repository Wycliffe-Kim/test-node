const R = require('ramda');

class Wrapper {
  constructor(value) {
    this._value = value;
  }

  map(f) {
    return f(this._value);
  }

  fmap(f) {
    return new Wrapper(f(this._value));
  }
}

const two = new Wrapper(2);
const add = R.curry((a, b) => a + b);

console.log(two.fmap(add(3)).fmap(add(2)).map(R.identity)); // 7