
const Flow = require('../');

Flow(function*(cb) {

    console.log('now', Date.now());

    yield setTimeout(cb, 1000);
    console.log('now', Date.now());

    yield setTimeout(cb, 1000);
    console.log('now', Date.now());

});
