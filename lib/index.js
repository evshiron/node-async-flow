
const chalk = require('chalk');

function Flow(factory) {

    var instance = factory(cb);

    function cb() {
        console.trace(chalk.yellow('DEPRECATED: Use cb.single or cb.expect if possible.'));
        return arguments.length > 1 ? instance.next(arguments) : instance.next(arguments[0]);
    }

    cb.single = function(value) {
        return instance.next(value);
    };

    cb.expect = function(count) {
        return function() {

            var params = Array.from(arguments);
            params.length = count;
            return instance.next(params);

        }
    };

    cb.map = function() {

        var keys = Array.prototype.slice.call(arguments, 0);

        return function() {
            var map = {};
            keys.map((key, idx) => map[key] = arguments[idx]);
            return instance.next(map);
        };

    };

    // Start the instance.
    instance.next();

}

module.exports = Flow;

Object.assign(module.exports, {
    util: require('./util')
});
