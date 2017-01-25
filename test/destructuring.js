
import test from 'ava';

const Flow = require('../');

test('single', t => {
    return Flow(function*(cb) {

        const one = yield setTimeout(() => {
            cb.single(1);
        }, 0);

        t.is(one, 1);

    });
});

test('single:fs', t => {
    return Flow(function*(cb) {

        const { exists: fexists } = require('fs');

        const exists = yield fexists(module.filename, cb.single);

        t.true(exists);

    });
});

test('expect', t => {
    return Flow(function*(cb) {

        const [ one, two, three ] = yield setTimeout(() => {
            cb.expect(3)(1, 2, 3);
        }, 0);

        t.is(one, 1);
        t.is(two, 2);
        t.is(three, 3);

    });
});

test('expect:slice', t => {
    return Flow(function*(cb) {

        const [ one, two, three ] = yield setTimeout(() => {
            cb.expect(2)(1, 2, 3);
        }, 0);

        t.is(one, 1);
        t.is(two, 2);
        t.falsy(three);

    });
});

test('expect:ignore', t => {
    return Flow(function*(cb) {

        const [ one, , three ] = yield setTimeout(() => {
            cb.expect(3)(1, 2, 3);
        }, 0);

        t.is(one, 1);
        t.throws(() => {
            t.is(two, 2);
        });
        t.is(three, 3);

    });
});

test('expect:fs', t => {
    return Flow(function*(cb) {

        const { stat: fstat, Stats } = require('fs');

        const [ err, stat ] = yield fstat(module.filename, cb.expect(2));

        t.falsy(err);
        t.true(stat instanceof Stats);

    });
});

test('map', t => {
    return Flow(function*(cb) {

        const { one, two, three } = yield setTimeout(() => {
            cb.map('one', 'two', 'three')(1, 2, 3);
        }, 0);

        t.is(one, 1);
        t.is(two, 2);
        t.is(three, 3);

    });
});

test('map:fs', t => {
    return Flow(function*(cb) {

        const { stat: fstat, Stats } = require('fs');

        const { err, stat } = yield fstat(module.filename, cb.map('err', 'stat'));

        t.falsy(err);
        t.true(stat instanceof Stats);

    });
});

