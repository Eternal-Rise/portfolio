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

const paths = {
  clean: {
    dest: argv.clean && argv.path ? `${dest}/${path}*`
      : argv.clean ? `${dest}*`
      : path ? [`${dest}${path}*.html`, `${dest}${path}js/*.js`, `${dest}${path}styles/*.css`]
      : [`${dest}*.html`, `${dest}js/*.js`, `${dest}styles/*.css`]
  },
  favicon: {
    src: `./src/${path}img/favicon/favicon.{jpg,jpeg,png,gif}`,
    dest: `${dest}${path}img/favicons/`,
    watch: `./src/${path}img/favicon/favicon.{jpg,jpeg,png,gif}`,
  },
  fonts: {
    src: `./src/${path}fonts/**/*.{ttf,otf,woff,woff2}`,
    dest: `${dest}${path}fonts/`,
    watch: `./src/${path}fonts/**/*.{ttf,otf,woff,woff2}`
  },
  img: {
    src: [
      `./src/${path}img/**/*.{jpg,jpeg,png,gif,svg}`,
      `!./src/${path}img/**/svg/*.svg`,
      `!./src/${path}img/**/favicon.{jpg,jpeg,png,gif}`
    ],
    dest: `${dest}${path}img/`,
    watch: [
      `./src/${path}img/**/*.{jpg,jpeg,png,gif,svg}`,
      `!./src/${path}img/**/svg/*.svg`,
      `!./src/${path}img/**/favicon.{jpg,jpeg,png,gif}`
    ],

    svg: {
      src: `./src/${path}img/svg/*.svg`,
      watch: `./src/${path}img/svg/*.svg`,
      dest: `${dest}${path}/img/sprites`
    }
  },
  pug: {
    src: `./src/${path}*.pug`,
    dest: `${dest}${path}`,
    watch: [`./src/${path}*.pug`, `./src/${path}blocks/**/*.pug`]
  },
  sass: {
    src: `./src/${path}styles/*.{sass,scss}`,
    dest: `${dest}${path}styles/`,
    watch: [`./src/${path}styles/*.{sass,scss}`,`./src/${path}blocks/**/*.{sass,scss}`]
  },
  scripts: {
    src: `./src/${path}js/index.js`,
    dest: `${dest}${path}/js`,
    watch: [`./src/${path}/js/*.js`, `./src/${path}/blocks/**/*.js`]
  },
  smartgrid: `./src/${path}/styles/`
}

const favsConfig = {
  icons: {
    appleIcon: true,
    favicons: true,
    online: false,
    appleStartup: false,
    android: false,
    firefox: false,
    yandex: false,
    windows: false,
    coast: false
  }
};

// smartgrid
const gridConfig = {
  outputStyle: 'scss',
  filename: '_grid',
  columns: 12, // number of grid columns
  offset: '30px', // gutter width
  mobileFirst: true,
  mixinNames: {
    container: 'inner'
  },
  container: {
    maxWidth: '1200px',
    fields: '15px' // side fields
  },
  breakPoints: {
    xs: {
      width: '320px'
    },
    sm: {
      width: '480px'
    },
    xsm: {
      width: '640px'
    },
    md: {
      width: '736px'
    },
    lg: {
      width: '960px'
    },
    xl: {
      width: '1200px'
    },
    xxl: {
      width: '1600px'
    }
  }
}

const plugins = [
  autoprefixer({grid: false, remove: true}),
  cssnano({
    preset: [
      'default',
      {
        // production - true / false
        normalizeWhitespace: argv.production,
        cssDeclarationSorter: {
          order: 'smacss'}
      }
    ]
  })
]

import taskCleaner from './tasks/cleaner';
import taskFavs from './tasks/favs';
import taskFonts from './tasks/fonts.js';
import taskGraphics from './tasks/graphics';
import taskGrid from './tasks/smartgrid';
import taskMarkup from './tasks/markup';
import taskScripts from './tasks/scripts';
import taskStyles from './tasks/styles';
import taskSvgsprites from './tasks/svgsprites';

export const cleaner = () => taskCleaner(paths.clean.dest);
export const favs = () => taskFavs(paths.favicon.src, paths.favicon.dest, favsConfig);
export const fonts = () => taskFonts(paths.fonts.src, paths.fonts.dest);
export const graphics = () => taskGraphics(paths.img.src, paths.img.dest);
export const grid = () => taskGrid(paths.smartgrid, gridConfig);
export const markup = () => taskMarkup(paths.pug.src, paths.pug.dest, argv.production);
export const scripts = () => taskScripts(paths.scripts.src, paths.scripts.dest, argv.production);
export const styles = () => taskStyles(paths.sass.src, paths.sass.dest, plugins, argv.production);
export const svgsprites = () => taskSvgsprites(paths.img.svg.src, paths.img.svg.dest);

export const serve = () => {
  browserSync.init({
    notify: false,
    server: `${dest}${path}`,
    scrollRestoreTechnique: 'cookie'
  });

  gulp.watch(paths.img.watch, gulp.series(graphics))
    .on('change', browserSync.reload);
  gulp.watch(paths.favicon.watch, gulp.series(favs))
    .on('change', browserSync.reload);
  gulp.watch(paths.fonts.watch, gulp.series(fonts))
    .on('change', browserSync.reload);
  gulp.watch(paths.pug.watch, gulp.series(markup))
    .on('change', browserSync.reload);
  gulp.watch(paths.scripts.watch, gulp.series(scripts))
    .on('change', browserSync.reload);
  gulp.watch(paths.sass.watch, gulp.series(styles))
  gulp.watch(paths.img.svg.watch, gulp.series(svgsprites))
    .on('change', browserSync.reload);
};

export const dev = gulp.series(
  cleaner, favs, fonts, graphics, markup, scripts, styles, svgsprites
);
export const build = gulp.series(
  cleaner, graphics, favs, fonts, markup, scripts, styles, svgsprites
);

export default dev;