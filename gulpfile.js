var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var crypto = require('crypto');
var through = require('through2');


var path = require('path');
var fs = require('fs');

var out_path = './js/pack/';
var js_reg= /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gm;

//根据文件内容计算文件md5值
var getFileMd5Str = function (fileContent) {
    return crypto.createHash('md5').update(fileContent).digest('hex');
};

var getConfig = function () {	
	return JSON.parse(fs.readFileSync('./js/config.json', 'utf-8'));	
};

var createFile = function (obj) {
	var stream = gulp.src(obj.src);
	
	if(obj.merge){
		stream =  stream.pipe(concat(obj.name));
	}
	
	if(obj.compress){
		stream = stream.pipe(uglify());
	}
	
	stream.pipe(gulp.dest(out_path));
};

gulp.task('default', function() {
	var config = getConfig();
	
	for(var c in config){
		createFile(config[c]);
	}	
});

