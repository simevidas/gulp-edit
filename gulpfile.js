var gulp = require('gulp');
var edit = require('./');

gulp.task('test', function () {
	gulp.src('playground/src/sample.md')
		.pipe(edit(function (contents, file, cb) {
		
			// Normal sync usage (WORKS)
			// return contents + 'bar';
		
			// Normal async usage (WORKS)
			// cb(null, contents + 'bar');
		
			// Testing sync error (FAILS; I get “unhandled error event message” in console)
			// throw new Error('Testing sync error.');	
		
		
			// Testing async error (FAILS; I get no message at all in console)
			// cb(new Error('Testing async error.'));
		
		}))
		.pipe(gulp.dest('playground/dest/'));
});