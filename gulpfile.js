var gulp = require('gulp');
const { series, task } = require('gulp');
var sass = require('gulp-sass');
var { watch } = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel')

function style() {
    return gulp.src(['./src/assets/scss/*.scss',
        './src/sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(browserSync.stream())
}

function minifiCss() {
    return gulp.src('./build/assets/css/style.css')
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/assets/css'));
}

function js() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/owl.carousel/dist/owl.carousel.min.js',
        './bower_components/animate-js/animate.js',
        './bower_components/wow/dist/wow.min.js',
        './src/js/*.js'])
        .pipe(gulp.dest('./build/assets/vendor/js'))
        .pipe(browserSync.stream()) // tự động refresh lại trang
}

// function complierEs6() {
//     return gulp.src(['./src/js/es6/*.js']).pipe(babel())
//         .pipe(gulp.dest('./build/js/dest'));
// }
function watchSystem() {
    browserSync.init({
        server: {
            baseDir: ["./build", "./src"]
        }
    });
    watch('./build/*.html').on('change', browserSync.reload),
    watch('./src/assets/scss/**/*.scss', style).on('change', browserSync.reload);
    watch('./src/scss/**/*.scss', minifiCss).on('change', browserSync.reload);
    watch('./build/*.html').on('change', browserSync.reload);
    watch('./src/assets/js/**/*.js', js).on('change', browserSync.reload);
    watch('./src/assets/js/main.js', js).on('change', browserSync.reload)
}
//exports.build = series('build');
exports.build = series(style, minifiCss, js, watchSystem);
exports.style = style;
