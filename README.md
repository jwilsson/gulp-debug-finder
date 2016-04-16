# gulp-debug-finder
[![npm](https://img.shields.io/npm/v/gulp-debug-finder.svg)](https://www.npmjs.com/package/gulp-debug-finder)
[![Build Status](https://travis-ci.org/jwilsson/gulp-debug-finder.svg?branch=master)](https://travis-ci.org/jwilsson/gulp-debug-finder)

Make sure `console.log()` statements doesn't make it into production.

## Install
*Note: Node 4 or later is required.*

```bash
npm install gulp-debug-finder --save-dev
```

## Usage
```js
var gulp = require('gulp');
var debugFinder = require('gulp-debug-finder');

gulp.task('default', function () {
    return gulp.src('src/*.js')
        .pipe(debugFinder());
});
```
