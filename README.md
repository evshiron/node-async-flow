# node-async-flow

An aggressive async flow solution for node.js.

The support for Generator is required.

## Why?

node.js is excellent for it's advanced support for new standards. But it's been a headache as there are callbacks everywhere and it's hard to compose logic between them.

Peoples have been attempting to solve this situation for a long time:

The `async` provides handy utility functions to chain things together, along with a central error handing mechanism. It saves some nested callbacks but doesn't solve the problem.

There are also many Promise implementations, like `q` and `bluebird`. I personally dislike Promises because it's a standard which makes things harder: everything is in chainable callbacks and now we have a nice constructor and resolve and reject and then and catch, wow!

The `co` is the widely used generator-based solution for the callback hells. It's similar to the async/await standard and use Promises. To be used with `co`, everything should be Promises or "thunkified", which is another story.

Here comes the `node-async-flow`.

## Features

* No wrapper needed for existing code (compared to `new Promise` and `thunkify`)
* No need to pass variables every next step
* Async in native loops
* In place error handling (if error is solvable let's continue)

## Installation

```bash
npm install node-async-flow --save
```

## Examples

See [examples](./examples/), [tests](./tests/), [nwjs-download](https://github.com/evshiron/nwjs-download) and [nwjs-builder](https://github.com/evshiron/nwjs-builder) :)

Some code snippets:

```javascript

const { exists, readFile } = require('fs');

const Flow = require('node-async-flow');

// Sleep 10 seconds.
Flow(function*(cb) {
  console.log('now:', Date.now());
  for(let i = 0; i < 10; i++) {
    yield setTimeout(cb.single, 1000);
  }
  console.log('now:', Date.now());
});

// Async check file exists and do something.
Flow(function*(cb) {
  if(yield exists('package.json', cb.single)) {
    console.log('File exists.');
  }
});

// Async read file and parse JSON.
Flow(function*(cb) {
  var [err, data] = yield readFile('package.json', { encoding: 'utf-8' }, cb.expect(2));
  if(err) return console.error(err);
  var json = JSON.parse(data);

  // or, in single line.
  var [err, json] = yield readFile('package.json', { encoding: 'utf-8' }, (err, data) => err ? cb.expect(2)(err) : cb.expect(2)(null, JSON.parse(data));
  if(err) return console.error(err);

  // or, use fs-extra.
  var [err, json] = yield require('fs-extra').readJson('package.json', cb.expect(2));
  if(err) return console.error(err);

});

// Destructuring.

const getOneValue = (callback) => setTimeout(() => callback(true), 0);
const getTwoValues = (callback) => setTimeout(() => callback(true, false), 0);
const getThreeValues = (callback) => setTimeout(() => callback(true, false, null), 0);

Flow(function*(cb) {
  var x = yield getOneValue(cb.single);
  // x == true.
  var x = yield getOneValue(cb.expect(1));
  // x == [true].
  var [x] = yield getOneValue(cb.expect(1));
  // x == true.
  var [x, y] = yield getTwoValues(cb.expect(1));
  // x == true, y == undefined.
  var [x, y] = yield getTwoValues(cb.expect(2));
  // x == true, y == false.
  var {z, y, x} = yield getThreeValues(cb.map('x', 'y', 'z'));
  // x == true, y == false, z == null.
});

```

## License

MIT.

