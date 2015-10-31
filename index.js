'use strict';

var rocambole = require('rocambole');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function () {
    var out = '';

    return through.obj(function (file, enc, cb) {
        var contents;

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-debug-finder', 'Streaming not supported.'));
        }

        try {
            contents = file.contents.toString();

            rocambole.moonwalk(contents, function (node) {
                var expression;
                var main;

                if (node.type !== 'CallExpression') {
                    return;
                }

                expression = node.callee;

                if (expression && expression.type !== 'MemberExpression') {
                    return;
                }

                main = expression.object;

                if (main && main.type === 'Identifier' && main.name === 'console' && expression.property) {
                    out = 'There are JavaScript debug statements present.';
                }
            });
        } catch (e) {
            this.emit('error', new gutil.PluginError('gulp-debug-finder', e, {
                fileName: file.path
            }));
        }

        return cb();
    }, function (cb) {
        if (out) {
            this.emit('error', new gutil.PluginError('gulp-debug-finder', out, {
                showStack: false
            }));
        }

        return cb();
    });
};
