
const Flow = require('../');

const { WaitUntil } = Flow.util;

Flow(function*(cb) {

    var flag = false;

    setTimeout(() => flag = true, 7500);
    console.log(Date.now());

    var isOnTime = yield WaitUntil(() => flag == true, 5000, cb.single);
    console.log(Date.now(), 'isOnTime:', isOnTime);

    var isOnTime = yield WaitUntil(() => flag == true, 5000, cb.single);
    console.log(Date.now(), 'isOnTime:', isOnTime);

});
