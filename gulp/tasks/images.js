import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';


const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "IMAGES" ,
        message: "Error: <%= error.massage %>"
      }))
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.dest(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewbox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());

};

export { images };