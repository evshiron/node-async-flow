
import test from 'ava';

const Promise = require('bluebird');

const Flow = require('../');

test('promisify', t => {
    return Flow(function*() {

        const { statAsync, Stats } = Promise.promisifyAll(require('fs'));

        const stat = yield statAsync(module.filename);

        t.true(stat instanceof Stats);

    });
});
