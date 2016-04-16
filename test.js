'use strict';

const gutil = require('gulp-util');
const debugFinder = require('./');
const assert = require('assert');

describe('gulp-debug-finder', () => {
    it('should warn when there are debug statements present', (cb) => {
        const stream = debugFinder();

        stream.on('error', () => {
            assert(true);

            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer('if (true) { console.log("Hello world"); }')
        }));

        stream.end();
    });
});
