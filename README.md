# node-flow

A utility function which enables async flow.

## Examples

See [examples](./examples/).

### Sleep

```javascript

const Flow = require('flow');

Flow(function*(cb) {

    console.log('now', Date.now());

    yield setTimeout(cb, 1000);
    console.log('now', Date.now());

    yield setTimeout(cb, 1000);
    console.log('now', Date.now());

});

/*
Output:
now 1459252138648
now 1459252139656
now 1459252140658
*/

```
