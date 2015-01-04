'use strict';

var edit = require('../');
var assert = require('assert');
var gutil = require('gulp-util');

it('should modify file contents in sync mode', function (callback) {
	
	var stream = edit(function modifierSync(contents) {
		return contents + 'bar';
	});

	stream.once('data', function (file) {
		assert.equal(file.contents.toString(), 'foobar');
	});

	stream.on('end', callback);

	stream.write(new gutil.File({
		path: 'lorem.txt',
		contents: new Buffer('foo')
	}));

	stream.end();
});

it('should modify file contents in async mode', function (callback) {
	
	var stream = edit(function modifierAsync(contents, file, cb) {
		cb(null, contents + 'bar');
	});

	stream.once('data', function (file) {
		assert.equal(file.contents.toString(), 'foobar');
	});

	stream.on('end', callback);

	stream.write(new gutil.File({
		path: 'lorem.txt',
		contents: new Buffer('foo')
	}));

	stream.end();
});
