'use strict';

// Include core
import gulp from 'gulp';
import yargs from 'yargs';

// Include plugins
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// Include live-reload
import browserSync from 'browser-sync';

const argv = yargs.argv;
const dest = argv.production ? './build/' : './dist/';
const path = argv.path ? `templates/${argv.path}/` : '';

// smartgrid container width
const width = argv.width || '1280px'

const paths = {
  clean: {
    // if clean - delete all, else - delete just html, css, js
    dest: argv.clean ? `${dest}${path}*`
          : [`${dest}${path}*.html`, `${dest}${path}js/*.js`, `${dest}${path}styles/*.css`],
  },
  favicon: {
    src: `./src/${path}img/favicon/favicon.{jpg,jpeg,png,gif}`,
    dest: `${dest}${path}img/favicons/`,
    watch: `./src/${path}img/favicon/favicon.{jpg,jpeg,png,gif}`,
  },
  fonts: {
    src: `./src/${path}fonts/**/*.{ttf,otf,woff,woff2}`,
    dest: `${dest}${path}fonts/`,
    watch: `./src/${path}fonts/**/*.{ttf,otf,woff,woff2}`,
  },
  img: {
    src: [
      `./src/${path}img/**/*.{jpg,jpeg,png,gif,svg}`,
      `!./src/${path}img/favicon/**/*`,
      `!./src/${path}img/sprites/**/*`,
    ],
    dest: `${dest}${path}img/`,
    watch: [
      `./src/${path}img/**/*.{jpg,jpeg,png,gif,svg}`,
      `!./src/${path}img/favicon/**/*`,
      `!./src/${path}img/sprites/**/*`,
    ],
  },
  pug: {
    src: `./src/${path}*.pug`,
    dest: `${dest}${path}`,
    watch: [`./src/${path}*.pug`, `./src/${path}blocks/**/*.pug`],
  },
  sass: {
    src: `./src/${path}styles/*.{sass,scss}`,
    dest: `${dest}${path}styles/`,
    watch: [`./src/${path}styles/*.{sass,scss}`,`./src/${path}blocks/**/*.{sass,scss}`],
  },
  scripts: {
    src: `./src/${path}js/index.js`,
    dest: `${dest}${path}js`,
    watch: [`./src/${path}js/**/*.js`, `./src/${path}blocks/**/*.js`],
  },
  smartgrid: `./src/${path}styles/`,

  sprite: {
    src: `./src/${path}img/sprite/*.svg`,
    watch: `./src/${path}img/sprite/*.svg`,
    dest: `${dest}${path}img/sprite/`,
  },
}

const configs = {
  favs: {
    icons: {
      appleIcon: true,
      favicons: true,
      online: false,
      appleStartup: false,
      android: false,
      firefox: false,
      yandex: false,
      windows: false,
      coast: false,
    },
  },
  grid: {
    outputStyle: 'scss',
    filename: '_grid',
    columns: 12, // number of grid columns
    offset: '30px', // gutter width
    mobileFirst: true,
    mixinNames: {
      container: 'container',
    },
    container: {
      maxWidth: width,
      fields: '15px', // side fields
    },
    breakPoints: {
      xs: {
        width: '320px',
      },
      sm: {
        width: '480px',
      },
      xsm: {
        width: '640px',
      },
      md: {
        width: '736px',
      },
      lg: {
        width: '960px',
      },
      xl: {
        width: '1200px',
      },
      xxl: {
        width: '1600px',
      },
    },
  },
  sprite: {
    mode: {
      stack: {
        sprite: "../sprite.svg",
      },
    },
  },
  plugins: [
    autoprefixer({grid: false, remove: true}),
    cssnano({
      preset: [
        'default',
        {
          // minimize if production
          normalizeWhitespace: argv.production ? true : false,
          cssDeclarationSorter: {
            order: 'smacss',
          },
        },
      ],
    }),
  ],
}

import taskCleaner from './tasks/cleaner';
import taskFavs from './tasks/favs';
import taskFonts from './tasks/fonts.js';
import taskGraphics from './tasks/graphics';
import taskGrid from './tasks/smartgrid';
import taskMarkup from './tasks/markup';
import taskScripts from './tasks/scripts';
import taskStyles from './tasks/styles';
import taskSprite from './tasks/sprite';

export const cleaner = () => taskCleaner(paths.clean.dest);
export const favs = () => taskFavs(paths.favicon.src, paths.favicon.dest, configs.favs);
export const fonts = () => taskFonts(paths.fonts.src, paths.fonts.dest);
export const graphics = () => taskGraphics(paths.img.src, paths.img.dest);
export const grid = () => taskGrid(paths.smartgrid, configs.grid);
export const markup = () => taskMarkup(paths.pug.src, paths.pug.dest, argv.production);
export const scripts = () => taskScripts(paths.scripts.src, paths.scripts.dest, argv.production);
export const sprite = () => taskSprite(paths.sprite.src, paths.sprite.dest, configs.sprite);
export const styles = () => taskStyles(paths.sass.src, paths.sass.dest, configs.plugins, argv.production);

export const serve = () => {
  browserSync.init({
    notify: false,
    open: false,
    scrollRestoreTechnique: 'cookie',
    server: `${dest}${path}`,
    watch: true,
  });

  gulp.watch(paths.img.watch, gulp.series(graphics))
    .on('change', browserSync.reload);

  gulp.watch(paths.favicon.watch, gulp.series(favs))
    .on('change', browserSync.reload);

  gulp.watch(paths.fonts.watch, gulp.series(fonts))
    .on('change', browserSync.reload);

  gulp.watch(paths.sprite.watch, gulp.series(sprite))
    .on('change', browserSync.reload);

  gulp.watch(paths.pug.watch, gulp.series(markup))
  gulp.watch(paths.scripts.watch, gulp.series(scripts))
  gulp.watch(paths.sass.watch, gulp.series(styles));
};

export const dev = gulp.series(
  cleaner, favs, fonts, graphics, markup, scripts, sprite, styles 
);

export default dev;