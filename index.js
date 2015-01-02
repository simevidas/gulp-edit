'use strict';

var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (modifier) {
	
	return through.obj(function (file, enc, next) {
		
		function buffer(err, contents) {
			file.contents = new Buffer(contents);
			next(err, file);

		}
	  
		if (file.isNull() || !modifier) {
			next(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-edit', 'Streaming not supported'));
			return;
		}
		
		try {
			var retVal = modifier.apply(file, [
				file.contents.toString(),
				file,
				buffer
			]);
			
			if (retVal) {
				buffer(null, retVal);
			}
			
		} catch (err) {
			next(new gutil.PluginError('gulp-edit', err, { fileName: file.path }));
		}
  });
};