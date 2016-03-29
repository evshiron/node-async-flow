
const fs = require('fs');

const test = require('tape');

const Flow = require('../');

function Return(value, callback) {

    setTimeout(() => callback(value), 0);

}

test('destructuring', (t) => {

    t.plan(4);

    Flow(function*(cb) {

        var x = yield Return('x', cb);
        t.equal(x, 'x');

        var [y] = yield Return('y', cb);
        t.equal(y, 'y');

        var [xx, yy] = yield Return(['xx', 'yy'], cb);
        t.equal(xx, 'xx');
        t.equal(yy, 'yy');

    });

});

test('fs-destructuring', (t) => {

    t.plan(1);

    Flow(function*(cb) {

        const self = module.filename;

        var exists = yield fs.exists(self, cb);
        t.equal(exists, true);

        if(false) {

            // Crashes.
            var [exists] = yield fs.exists(self, cb);
            t.equal(exists, true);

        }

    });

});
