# gulp-debug-finder
Make sure `console.log()` statements doesn't make it into production.

## Install
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
