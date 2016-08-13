'use strict';

const debugFinder = require('./');
const assert = require('assert');
const File = require('vinyl');

describe('gulp-debug-finder', () => {
    it('should warn when there are debug statements present', (cb) => {
        const stream = debugFinder();

        stream.on('error', () => {
            assert(true);

            cb();
        });

        stream.write(new File({
            contents: new Buffer('if (true) { console.log("Hello world"); }'), // eslint-disable-line node/no-deprecated-api
        }));

        stream.end();
    });
});
