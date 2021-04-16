/*
gulp-example

Version

Author

*/

//-------------------------------------<Variables>------------------------------------------//
let preprocessor = 'sass'; 																	// Preprocessor 
let fileswatch   = 'html,htm,txt,json,md,woff2'; 											// List of files extensions for watching & hard reload (comma separated)
let imageswatch  = 'jpg,jpeg,png,webp,svg'; 												// List of images extensions for watching & compression (comma separated)

//---------------------------------------<NodeJS>-------------------------------------------//
const { src, dest, parallel, series, watch } = require('gulp');								// Gulp
const sass         = require('gulp-sass');													// Sass
const cleancss     = require('gulp-clean-css');												// Clean css
const concat       = require('gulp-concat');												// Concat files
const browserSync  = require('browser-sync').create();										// Concat files
const uglify       = require('gulp-uglify-es').default;										// UglifyJS
const autoprefixer = require('gulp-autoprefixer');											// -moz- -o- -webkit- etc.
const imagemin     = require('gulp-imagemin');												// Minification images
const newer        = require('gulp-newer');													// Minification images too
const rsync        = require('gulp-rsync');													// Deploy build files
const del          = require('del');														// del files

//-------------------------------------<LiveReload>-----------------------------------------//
function browsersync() {
	browserSync.init({
		server: { baseDir: 'build/' },
		notify: false,
		// online: false, // Work offline without internet connection
	})
}

//----------------------------------------<Html>--------------------------------------------//
function html() {
	return src('src/*.html')
	.pipe(dest('build'))
}

//---------------------------------------<Styles>-------------------------------------------//
function styles() {
	return src('src/' + preprocessor + '/main.*')
	.pipe(eval(preprocessor)())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(dest('build/css'))
	.pipe(browserSync.stream())
}

//--------------------------------------<Scripts>-------------------------------------------//
function scripts() {
	return src([
																							// Setup own js libraries and frameworks
		'node_modules/jquery/dist/jquery.min.js', 											// npm i --save jquery
		'src/js/app.js'
		])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(dest('build/js'))
	.pipe(browserSync.stream())
}

//--------------------------------------<Images>--------------------------------------------//
function images() {
	return src('src/images/**/*')															// Minimize in future
	.pipe(dest('build/images'))
}

//---------------------------------------<Fonts>--------------------------------------------//
function fonts() {
	return src('src/fonts/**/*.woff2')
	.pipe(dest('build/fonts'))
}

//-----------------------------------<Rsync Function>---------------------------------------//
function deploy() {
	return src('build/')
	.pipe(rsync({
		root: 'build/',																		// Deploy from "build" folder
		hostname: 'user@server',															// User name for server
		destination: '/var/www/html',														// Folder in server
		port: 22,																			// Port to server access
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store', '**/*.html'], 							// Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

//----------------------------------------<Watch>--------------------------------------------//
function startwatch() {	
	watch('src/*.html', {usePolling: true}, html);
	watch('src/' + preprocessor + '/**/*', {usePolling: true}, styles);
	watch('src/**/*.js', {usePolling: true}, scripts);
	watch('src/**/*.{' + imageswatch + '}', {usePolling: true}, images);
	watch('src/**/*.{' + fileswatch + '}', {usePolling: true}).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.html 		= html;
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.fonts      	= fonts;
exports.deploy    	= deploy;
exports.default     = parallel(html, styles, scripts, images, fonts, browsersync, startwatch);
