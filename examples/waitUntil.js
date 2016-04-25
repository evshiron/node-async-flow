const Flow = require('../');

Flow(function*(cb, U) {

    var flag = false;

    setTimeout(() => flag = true, 7500);
    console.log(Date.now());

    var isOnTime = yield U.WaitUntil(() => flag, 5000, cb);
    console.log(Date.now(), 'isOnTime:', isOnTime);

    var isOnTime = yield U.WaitUntil(() => flag, 5000, cb);
    console.log(Date.now(), 'isOnTime:', isOnTime);

});
