
var debug = require('debug')('Flow');

var Promise = require('bluebird');

function isPromise(promise) {
    return promise && promise.then && typeof promise.then == 'function';
}

function next(instance, params, onerror, onend) {

    setImmediate(function() {

        var state = instance.next(params);

        if(state.done) {
            onend(state.value);
        }
        else if(state.value && isPromise(state.value)) {

            var promise = state.value;

            promise.then(function(value) {
                next.apply(null, [instance, value, onerror, onend]);
            })
            .catch(onerror);

        }

    });

}

function Flow(gen) {
    return new Promise(function(resolve, reject) {

        var cb = {};

        var instance = gen(cb);

        cb.single = function(value) {
            return next(instance, value, reject, resolve);
        };

        cb.expect = function(count) {
            return function() {
                var params = Array.prototype.slice.call(arguments, 0);
                params.length = count;
                return next(instance, params, reject, resolve);
            };
        };

        cb.map = function() {

            var keys = Array.prototype.slice.call(arguments, 0);

            return function() {
                var params = Array.prototype.slice.call(arguments, 0);
                var map = {};
                keys.map(function(key, idx) {
                    map[key] = params[idx];
                });
                return next(instance, map, reject, resolve);
            };

        };

        // Start the instance.
        next(instance, null, reject, resolve);

    });
}

module.exports = Flow;
