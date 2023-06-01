import gulp from 'gulp';
import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: true })
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "JS" ,
      message: "Error: <%= error.massage %>"
    }))
  )
  .pipe(webpack({ config: webpackConfig(app.isDev) }))
  .pipe(app.gulp.dest(app.path.build.js))
  .pipe(app.plugins.browserSync.stream());
};

export { js };