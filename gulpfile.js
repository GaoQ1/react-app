var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');


gulp.task('cssmin',function(){
  gulp.src('dist/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('jsmin',function(){
    return gulp.src(['dist/**/*.js','!dist/**/client.config.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('default',['cssmin', 'jsmin']);
