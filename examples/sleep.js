
const Flow = require('../');

Flow(function*(cb) {

    console.log('now', Date.now());

    yield setTimeout(cb.single, 1000);
    console.log('now', Date.now());

    yield setTimeout(cb.single, 1000);
    console.log('now', Date.now());

});
