var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('styles', function(){
	gulp.src('./styles/scss/*.scss')
	.pipe(sass())
	.on('error',console.log.bind(console))
	.pipe(gulp.dest('./styles/css'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function(){
	gulp.src('./scripts/*.js').
	pipe(gulp.dest('./dist'));
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './'
    }

	});

	gulp.watch('./styles/scss/*.scss', ['styles']);
	gulp.watch('./js/*.js', ['scripts']);
	gulp.watch('./**/*.html').on('change',browserSync.reload);
	gulp.watch('./**/*.js').on('change',browserSync.reload);
});

gulp.task('default', ['styles','scripts','serve']);

gulp.task('deploy', ['styles','scripts']);

gulp.task('watch:es6', () => {
  return gulp.watch('./styles/scss/*.scss', gulp.series('es6:react', function (done) {
    browserSync.reload();
    done();
  }));
});
