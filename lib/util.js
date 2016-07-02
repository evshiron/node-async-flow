
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

module.exports.WaitUntil = WaitUntil;
