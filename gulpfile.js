var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var crypto = require('crypto');
var through = require('through2');
var minifycss = require('gulp-minify-css');


var path = require('path');
var fs = require('fs');

var out_js = './static/js/';
var out_css = './static/css/';
var out_img = './static/images/';
var out_html = './static/html/';
var html_path = './html/';
var css_path = './css/';
var img_path = './images/';
var js_reg= /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gm;
var css_reg= /<link(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/>)*/gm;

var map = {};

//
var getFileMd5Str = function (fileContent) {
    return crypto.createHash('md5').update(fileContent).digest('hex');
};

var getConfig = function (type) {	
	return JSON.parse(fs.readFileSync('./js/config_' + type + '.json', 'utf-8'));	
};

var createFile = function (obj, outPath) {
	var stream = gulp.src(obj.src);
	var md5 = gulp.src(obj.src);
	
	if(obj.merge){
		stream =  stream.pipe(concat(obj.name));
	}
	
	if(obj.compress){
		//stream = stream.pipe(uglify());
	}

	stream.pipe(through.obj(function(file, enc, cb){
		map[obj.name] = getFileMd5Str(file.contents);
	}));

	stream.pipe(gulp.dest(outPath));
};

var createFileByCss = function (obj, outPath) {
	var stream = gulp.src(obj.src);
	var md5 = gulp.src(obj.src);
	
	if(obj.merge){
		stream =  stream.pipe(concat(obj.name));
	}
	
	if(obj.compress){
		//stream = stream.pipe(minifycss());
	}

	stream.pipe(through.obj(function(file, enc, cb){
		map[obj.name] = getFileMd5Str(file.contents);
	}));

	stream.pipe(gulp.dest(outPath));
};

var createMap = function (path, name) {
	var context = fs.readFileSync(path + name, "utf-8");
	var md5 = getFileMd5Str(context);

	map[name] = md5;
};

var replaceMD5 = function (obj) {
	gulp.src(html_path + '*.html')
		.pipe(replace(js_reg, function (a, b){
			var src = b.indexOf("?") > -1 ? b.substring(0,b.indexOf("?")) : b;
			var	file = src.substring(src.lastIndexOf('/') + 1);
			var md5 = map[file] || new Date().getTime();

			src = src.replace("static/", "");
			
			return a.replace(b, src + "?v=" + md5);
		}))
		.pipe(replace(css_reg, function (a, b) {
			var src = b.indexOf("?") > -1 ? b.substring(0,b.indexOf("?")) : b;
			var	file = src.substring(src.lastIndexOf('/') + 1);
			var md5 = map[file] || new Date().getTime();

			src = src.replace("static/", "");

			return a.replace(b, src + "?v=" + md5);
		}))
		.pipe(gulp.dest(out_html));
};

var createCss = function () {
	var config = getConfig("css");

	for(var c in config){
		createFileByCss(config[c], out_css);
	}

	/*
	var name = "style.pack.css";
	var stream =gulp.src(css_path + '*.css')
		.pipe(concat(name));


	if(isMini){
		stream = stream.pipe(minifycss());
	}

	stream.pipe(through.obj(function(file, enc, cb){
		map[name] = getFileMd5Str(file.contents);
	}));

	stream.pipe(gulp.dest(out_css));
	*/
	//createMap(out_css, 'style.pack.css');
};

var createImage = function () {
	gulp.src(img_path + '*.*')
		.pipe(gulp.dest(out_img));
};

var createJs = function () {
	var config = getConfig("js");
	
	for(var c in config){
		createFile(config[c], out_js);
		//createMap(out_js, config[c].name);
	}
};


gulp.task('default', function() {
	createJs();
	createImage();
	createCss();
});

gulp.task('release', function () {
	createCss();
	createImage();
	createJs();

	setTimeout(function() {
		replaceMD5();	
	}, 5000);
});


gulp.task('watch', function () {
	gulp.watch('./js/**/*.js', ['default']);
});

