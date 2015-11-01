'use strict';

var gutil = require('gulp-util');
var debugFinder = require('./');
var assert = require('assert');

describe('gulp-debug-finder', function () {
    it('should warn when there are debug statements present', function (cb) {
        var stream = debugFinder();

        stream.on('error', function (error) {
            assert(true);

            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer('if (true) { console.log("Hello world"); }')
        }));

        stream.end();
    });
});
