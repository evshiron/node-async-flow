
var fs = require('fs');

var test = require('tape');

var Flow = require('../');

test('legacy', function(t) {

    Flow(function*(cb) {

        // Sleep 3 seconds.

        var start = Date.now();

        for(var i = 0; i < 3; i++) {
            yield setTimeout(cb.single, 1000);
        }

        t.ok(Date.now() - start > 3000);

        // Async read file and parse JSON, cb.expect version.

        var result = yield fs.readFile('package.json', { encoding: 'utf-8' }, cb.expect(2));
        t.notOk(result[0]);
        var json = JSON.parse(result[1]);
        t.ok(json);

        // Async read file and parse JSON, cb.map version.

        var result = yield fs.readFile('package.json', { encoding: 'utf-8' }, cb.map('err', 'data'));
        t.notOk(result.err);
        var json = JSON.parse(result.data);
        t.ok(json);

        t.end();

    });

});
