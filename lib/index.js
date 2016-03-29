
function Flow(g) {

    var instance = g(cb);

    function cb() {
        return arguments.length > 1 ? instance.next(arguments) : instance.next(arguments[0]);
    }

    // Start the instance.
    instance.next();

}

module.exports = Flow;

