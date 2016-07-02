
const chalk = require('chalk');

function Flow(factory) {

    var instance = factory(cb);

    function cb() {
        console.trace(chalk.yellow('DEPRECATED: Use cb.single or cb.expect if possible.'));
        return arguments.length > 1 ? instance.next(arguments) : instance.next(arguments[0]);
    }

    cb.single = function(value) {
        return process.nextTick(function() {
            instance.next(value);
        });
    };

    cb.expect = function(count) {
        return function() {
            var params = Array.prototype.slice.call(arguments, 0);
            params.length = count;
            return process.nextTick(function() {
                instance.next(params);
            });
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
            return process.nextTick(function() {
                instance.next(map);
            });
        };

    };

    // Start the instance.
    instance.next();

}

module.exports = Flow;
module.exports.util = require('./util');
