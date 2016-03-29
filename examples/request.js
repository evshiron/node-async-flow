
const request = require('request');

const Flow = require('../');

Flow(function*(cb) {

    const url = 'https://github.com/evshiron/node-flow';

    var [err, res, body] = yield request(url, cb);

    console.log(err);
    //console.log(res);
    console.log(body);

});
