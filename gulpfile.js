var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    // .pipe(sass())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});


gulp.task('scripts', function() {
  return gulp.src([
    'app/js/components/jquery-3.0.0.min.js',
    'app/js/components/jquery-migrate-1.4.1.min.js',
    'app/js/components/slick.js',
    'app/js/components/flexibility.js'
	])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});


gulp.task('css-libs', ['sass'], function() {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});


gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});


gulp.task('clean', function() {
  return del.sync('dist');
});


gulp.task('clear', function () {
  return cache.clearAll();
})


gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/index.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

  var buildCss = gulp.src([
    'app/css/style.css'
  ])
  .pipe(gulp.dest('dist/css'))

  var buildCss = gulp.src([
    'app/css/libs.min.css'
  ])
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  var buildJs = gulp.src('app/js/custom.js')
  .pipe(gulp.dest('dist/js'))

  var buildJs = gulp.src('app/js/libs.min.js')
  .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('app/index.html')
  .pipe(gulp.dest('dist'));

});


gulp.task('default', ['watch']);