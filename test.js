'use strict';

const PluginError = require('plugin-error');
const debugFinder = require('./');
const Stream = require('stream');
const File = require('vinyl');
const path = require('path');
const test = require('ava');

test('warn with debug statements present', (t) => {
    const stream = debugFinder();

    stream.on('error', () => {
        t.pass();
    });

    stream.write(new File({
        contents: new Buffer('if (true) { console.log("Hello world"); }'), // eslint-disable-line node/no-deprecated-api
    }));

    stream.end();
});

test('ignores null files', () => {
    const stream = debugFinder();

    stream.write(new File({
        base: __dirname,
        contents: null,
        path: path.join(__dirname, '/file.js'),
    }));

    stream.end();
});

test('ignores streams', (t) => {
    const stream = debugFinder();

    t.throws(() => {
        stream.write(new File({
            base: __dirname,
            contents: new Stream(),
            path: path.join(__dirname, '/file.js'),
        }));
    }, PluginError);

    stream.end();
});

test('should throw on invalid JS files', (t) => {
    const stream = debugFinder();

    t.throws(() => {
        stream.write(new File({
            contents: new Buffer('if (true) { console.log("Hello world");'), // eslint-disable-line node/no-deprecated-api
        }));
    }, PluginError);

    stream.end();
});
