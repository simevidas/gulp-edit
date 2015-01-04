'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-edit';

module.exports = function gulpEdit(modifier) {
	
	if (!modifier) {
		throw new PluginError(PLUGIN_NAME, 'Missing modifier function.');
	}
	
	return through.obj(function (file, enc, cb) {
		
		function buffer(err, contents) {
			file.contents = new Buffer(contents);
			cb(err, file);
		}
		
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError(PLUGIN_NAME, 'Streaming not supported.'));
			return;
		}
		
		try {
			var retVal = modifier(file.contents.toString(), file, buffer);
			
			if (retVal) {
				buffer(null, retVal);
			}
			
		} catch (err) {
			cb(new PluginError(PLUGIN_NAME, err, { fileName: file.path }));
		}
  });
};