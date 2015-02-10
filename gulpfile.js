var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var crypto = require('crypto');
var through = require('through2');


var path = require('path');
var fs = require('fs');

var out_path = './js/pack/';
var html_path = './html/';
var js_reg= /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gm;

var map = {};

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

var createMap = function (obj) {
	var context = fs.readFileSync(out_path + obj.name, "utf-8");
	var md5 = getFileMd5Str(context);

	map[obj.name] = md5;
};

var replaceMD5 = function (obj) {
	gulp.src(html_path + '*.html')
		.pipe(replace(js_reg, function (a, b){
			var src = b.indexOf("?") > -1 ? b.substring(0,b.indexOf("?")) : b;
			var	file = src.substring(src.lastIndexOf('/') + 1);
			var md5 = map[file] || new Date().getTime();

			return a.replace(b, src + "?v=" + md5);
		}))
		.pipe(gulp.dest(html_path + "/pack/"));
};

gulp.task('default', function() {
	var config = getConfig();
	
	for(var c in config){
		createFile(config[c]);
		createMap(config[c]);
	}

	replaceMD5();
});

gulp.task('watch', function () {
	gulp.watch('./js/**/*.js', ['default']);
});

