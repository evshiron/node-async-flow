
function WaitUntil(condition, timeout, cb) {

    const INTERVAL = Math.max(timeout / 100, 33);

    var counter = 0;

    function wait() {

        counter += INTERVAL;

        if(condition()) return cb(true);
        else if(counter >= timeout) return cb(false);
        else setTimeout(wait, INTERVAL);

    }

    setTimeout(wait, INTERVAL);

}

const Util = {
    WaitUntil: WaitUntil,
};

function Flow(g) {

    var instance = g(cb, Util);

    function cb() {
        return arguments.length > 1 ? instance.next(arguments) : instance.next(arguments[0]);
    }

    // Start the instance.
    instance.next();

}

module.exports = Flow;

