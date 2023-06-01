import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';


const createSvgSprite = () => {
  return app.gulp.src(`${app.path.src.svgIcons}`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "SVG" ,
      message: "Error: <%= error.massage %>"
    }))
  )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            /** Создавать страницу с перечнем иконок */
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`));
};

export { createSvgSprite };