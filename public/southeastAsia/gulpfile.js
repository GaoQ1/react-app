var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var plumber = require('gulp-plumber');
var less = require('gulp-less');


gulp.task('less',function(){
    var processors = [
      px2rem({remUnit: 75})
    ];

    return gulp.src('less/styles.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
});


gulp.task('watch:less', function(){
  gulp.watch('less/**/*.less', ['less'])
})

gulp.task('default',['watch:less']);
