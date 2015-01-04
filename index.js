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
		
		function retFn(err, contents) {			
			if (err) {
				cb(new PluginError(PLUGIN_NAME, err, { fileName: file.path }));
				return;
			}
			
			file.contents = new Buffer(contents);
			cb(null, file);
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
			var retVal = modifier(file.contents.toString(), file, retFn);
			
			if (retVal != null) {
				retFn(null, retVal);
			}
			
		} catch (err) {
			retFn(err);
		}
  });
};