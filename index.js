'use strict';

const PluginError = require('plugin-error');
const rocambole = require('rocambole');
const through = require('through2');

module.exports = () => {
    let out = '';

    return through.obj(function transform (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-debug-finder', 'Streaming not supported.'));
        }

        try {
            const contents = file.contents.toString();

            rocambole.moonwalk(contents, (node) => {
                const expression = node.callee || {};

                if (node.type !== 'CallExpression' || expression.type !== 'MemberExpression') {
                    return;
                }

                const maybeIdent = expression.object || {};

                if (maybeIdent.type === 'Identifier' && maybeIdent.name === 'console' && expression.property) {
                    out = 'There are JavaScript debug statements present.';
                }
            });
        } catch (e) {
            // eslint-disable-next-line no-invalid-this
            this.emit('error', new PluginError('gulp-debug-finder', e, {
                fileName: file.path,
            }));
        }

        return cb();
    }, function flush (cb) {
        if (out) {
            // eslint-disable-next-line no-invalid-this
            this.emit('error', new PluginError('gulp-debug-finder', out, {
                showStack: false,
            }));
        }

        return cb();
    });
};
