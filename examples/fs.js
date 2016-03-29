
const fs = require('fs');

const Flow = require('../');

Flow(function*(cb) {

    const self = module.filename;
    const lock = module.filename + '.lock';

    var exists = yield fs.exists(self, cb);
    console.log('fs.exists(self)', 'exists:', exists);

    var err = yield fs.writeFile(lock, '.lock', cb);
    console.log('fs.writeFile(lock)', 'err:', err);

    var exists = yield fs.exists(lock, cb);
    console.log('fs.exists(lock)', 'exists:', exists);

    var err = yield fs.unlink(lock, cb);
    console.log('fs.unlink(lock)', 'err:', err);

    var exists = yield fs.exists(lock, cb);
    console.log('fs.exists(lock)', 'exists:', exists);

});
