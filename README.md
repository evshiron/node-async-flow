# node-async-flow

An aggressive async flow solution for node.js.

## Features

* No wrapper needed for existing functions (compared to `new Promise` and `thunkify`)
* No need to pass variables every `then`
* Async in native loops
* Supports yielding Promises like `bluebird.coroutine`
* Returns Promise

## Installation

```bash
npm install node-async-flow --save
```

## Examples

See [test](./test/).

## Caveats

* Weird things happen when yielding between multi-context environments like NW.js.
* Everything is returned into a single scope, bringing pains when using `const` and `destructuring`.

## License

MIT.
