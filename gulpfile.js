'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var paths = {
	src: {
		styles: {
			app: 'sass/main.scss',
			appAll: 'sass/**/*.scss',
			libs: [
				'./node_modules/slick-carousel/slick/slick.css'
			]
		},
		scripts: {
			appAll: [
				'./scripts/main.js'
			],
			libs: [
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/slick-carousel/slick/slick.min.js',
				'./node_modules/bootstrap/dist/js/bootstrap.min.js'
			]
		},
		images: {
			all: 'images/*'
		}
	}
};
 
gulp.task('sass', function () {
	return gulp.src(paths.src.styles.app)
		.pipe(concat("style.css"))
		.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});