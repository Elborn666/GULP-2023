import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpCss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

import { plugins } from '../config/plugins.js';

const sass = gulpSass(dartSass);

const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS" ,
          message: "Error: <%= error.massage %>"
        }))
      )
      .pipe(plugins.replace(/@images\//g, '../images/'))
      .pipe(sass({ autputStyle: 'expanded' }))
      .pipe(groupCssMediaQueries())
      .pipe(webpCss({
        webpClass: '.webp',
        noWebpClass: '.no-webp',
      }))
      .pipe(autoPrefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true,
      }))
      .pipe(cleanCss())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
};

export { scss };