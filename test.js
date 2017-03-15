'use strict';

const PluginError = require('plugin-error');
const debugFinder = require('./');
const assert = require('assert');
const Stream = require('stream');
const File = require('vinyl');
const path = require('path');

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

    it('should ignore null files', () => {
        const stream = debugFinder();

        stream.write(new File({
            base: __dirname,
            contents: null,
            path: path.join(__dirname, '/file.js'),
        }));

        stream.end();
    });

    it('should ignore streams', () => {
        const stream = debugFinder();

        assert.throws(() => {
            stream.write(new File({
                base: __dirname,
                contents: new Stream(),
                path: path.join(__dirname, '/file.js'),
            }));
        }, PluginError);

        stream.end();
    });

    it('should throw on invalid JS files', () => {
        const stream = debugFinder();

        assert.throws(() => {
            stream.write(new File({
                contents: new Buffer('if (true) { console.log("Hello world");'), // eslint-disable-line node/no-deprecated-api
            }));
        }, PluginError);

        stream.end();
    });
});
