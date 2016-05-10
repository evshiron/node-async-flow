
const test = require('tape');

const Flow = require('../');

const getOneValue = (callback) => setTimeout(() => callback(true), 0);
const getTwoValues = (callback) => setTimeout(() => callback(true, false), 0);
const getThreeValues = (callback) => setTimeout(() => callback(true, false, null), 0);

test('destructuring', (t) => {

    Flow(function*(cb) {

        // Test cb.single.

        t.deepEqual(yield getOneValue(cb.single), true);

        var x = yield getOneValue(cb.single);
        t.equal(x, true);

        // Will not work.
        //var [x] = yield giveOneValue(cb.single);

        // Test cb.expect(count).

        t.deepEqual(yield getOneValue(cb.expect(1)), [true]);

        var [x] = yield getOneValue(cb.expect(1));
        t.equal(x, true);

        t.deepEqual(yield getTwoValues(cb.expect(1)), [true]);

        var [x, y] = yield getTwoValues(cb.expect(1));
        t.equal(x, true);
        t.equal(y, undefined);

        t.deepEqual(yield getTwoValues(cb.expect(2)), [true, false]);

        var [x, y] = yield getTwoValues(cb.expect(2));
        t.equal(x, true);
        t.equal(y, false);

        t.deepEqual(yield getThreeValues(cb.map('x', 'y', 'z')), { x: true, y: false, z: null });

        var result = yield getThreeValues(cb.map('x', 'y', 'z'));
        t.equal(result.x, true);
        t.equal(result.y, false);
        t.equal(result.z, null);

        var {z, y, x} = yield getThreeValues(cb.map('x', 'y', 'z'));
        t.equal(x, true);
        t.equal(y, false);
        t.equal(z, null);

        t.end();

    });

});
