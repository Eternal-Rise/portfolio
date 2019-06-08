'use strict';

// Include core
import gulp from 'gulp';
import yargs from 'yargs';

// Include plugins
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// Include live-reload
import browserSync from 'browser-sync';

// required to async await
import regeneratorRuntime from 'regenerator-runtime';

const webpackConfig = require("./webpack.config.js");
const argv = yargs.argv;

webpackConfig.mode = argv.production ? "production" : "development";
webpackConfig.devtool = argv.production ? false : "source-map";

const dest = argv.production ? './build' : './dist';


const paths = {
  main: {
    
    clean: {
      dest: argv.clean ? `${dest}/*` : [`${dest}/**/*.{html,css,js}`, `!${dest}/**/img`, `${dest}/**/img/favicons/*`]
    },
    favicon: {
      src: './src/img/favicon/favicon.{jpg,jpeg,png,gif}',
      dest: `${dest}/img/favicons`,
      watch: './src/img/favicon/favicon.{jpg,jpeg,png,gif}',
    },
    fonts: {
      src: './src/**/*.{ttf,otf,woff,woff2}',
      dest: `${dest}/`,
      watch: './src/**/*.{ttf,otf,woff,woff2}'
    },
    img: {
      src: [
        './src/**/*.{jpg,jpeg,png,gif,svg}',
        '!./src/**/svg/*.svg',
        '!./src/**/favicon.{jpg,jpeg,png,gif}'
      ],
      dest: dest,
      watch: [
        './src/**/*.{jpg,jpeg,png,gif,svg}',
        '!./src/**/svg/*.svg',
        '!./src/**/favicon.{jpg,jpeg,png,gif}'
      ],

      svg: {
        src: './src/img/svg/*.svg',
        watch: './src/img/svg/*.svg',
        dest: `${dest}/img/sprites`
      }
    },
    pug: {
      src: ['./src/**/*.pug', '!./src/**/blocks/**/*.pug'],
      dest: dest,
      watch: './src/**/*.pug'
    },
    sass: {
      src: ['./src/**/*.{sass,scss}', '!./src/**/blocks/**/*.{sass,scss}'],
      dest: dest,
      watch: './src/**/*.{sass,scss}'
    },
    scripts: {
      src: './src/js/index.js',
      dest: `${dest}/js`,
      watch: './src/**/*.js'
    },
  },

  templates: [
    // Barbershop
    {
      favicon: {
        src: './src/templates/Barbershop/img/favicon/favicon.{jpg,jpeg,png,gif}',
        dest: `${dest}/templates/Barbershop/img/favicons/`
      },
      svg: {
        src: './src/templates/Barbershop/img/svg/*.svg',
        watch: './src/templates/Barbershop/img/svg/*.svg',
        dest: `${dest}/templates/Barbershop/img/sprites`
      },
      scripts: {
        src: './src/templates/Barbershop/js/index.js',
        dest: `${dest}/templates/Barbershop/js/`
      }
    },
    // html5up_forty
    {
      favicon: {
        src: './src/templates/html5up_forty/img/favicon/favicon.{jpg,jpeg,png,gif}',
        dest: `${dest}/templates/html5up_forty/img/favicons/`
      },
      svg: {
        src: './src/templates/html5up_forty/img/svg/*.svg',
        watch: './src/templates/html5up_forty/img/svg/*.svg',
        dest: `${dest}/templates/html5up_forty/img/sprites`
      },
      scripts: {
        src: './src/templates/html5up_forty/js/index.js',
        dest: `${dest}/templates/html5up_forty/js/`
      }
    },
    // html5up_multiverse
    {
      favicon: {
        src: './src/templates/html5up_multiverse/img/favicon/favicon.{jpg,jpeg,png,gif}',
        dest: `${dest}/templates/html5up_multiverse/img/favicons/`
      },
      svg: {
        src: './src/templates/html5up_multiverse/img/svg/*.svg',
        watch: './src/templates/html5up_multiverse/img/svg/*.svg',
        dest: `${dest}/templates/html5up_multiverse/img/sprites`
      },
      scripts: {
        src: './src/templates/html5up_multiverse/js/index.js',
        dest: `${dest}/templates/html5up_multiverse/js/`
      }
    },
    // Tinyone
    {
      favicon: {
        src: './src/templates/Tinyone/img/favicon/favicon.{jpg,jpeg,png,gif}',
        dest: `${dest}/templates/Tinyone/img/favicons/`
      },
      svg: {
        src: './src/templates/Tinyone/img/svg/*.svg',
        watch: './src/templates/Tinyone/img/svg/*.svg',
        dest: `${dest}/templates/Tinyone/img/sprites`
      },
      scripts: {
        src: './src/templates/Tinyone/js/index.js',
        dest: `${dest}/templates/Tinyone/js/`
      }
    },
    // Travelplus
    {
      favicon: {
        src: './src/templates/Travelplus/img/favicon/favicon.{jpg,jpeg,png,gif}',
        dest: `${dest}/templates/Travelplus/img/favicons/`
      },
      svg: {
        src: './src/templates/Travelplus/img/svg/*.svg',
        watch: './src/templates/Travelplus/img/svg/*.svg',
        dest: `${dest}/templates/Travelplus/img/sprites`
      },
      scripts: {
        src: './src/templates/Travelplus/js/index.js',
        dest: `${dest}/templates/Travelplus/js/`
      }
    },
  ]
};

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
import taskMarkup from './tasks/markup';
import taskScripts from './tasks/scripts';
import taskStyles from './tasks/styles';
import taskSvgsprites from './tasks/svgsprites';

export const cleaner = () => taskCleaner(paths.main.clean.dest);
export const favs = () => taskFavs(paths.main.favicon.src, paths.main.favicon.dest, paths.templates, favsConfig);
export const fonts = () => taskFonts(paths.main.fonts.src, paths.main.fonts.dest);
export const graphics = () => taskGraphics(paths.main.img.src, paths.main.img.dest);
export const markup = () => taskMarkup(paths.main.pug.src, paths.main.pug.dest, argv.production);
export const scripts = () => taskScripts(paths.main.scripts.src, paths.main.scripts.dest, paths.templates, argv.production);
export const styles = () => taskStyles(paths.main.sass.src, paths.main.sass.dest, plugins, argv.production);
export const svgsprites = () => taskSvgsprites(paths.main.img.svg.src, paths.main.img.svg.dest, paths.templates);



export const serve = () => {
  browserSync.init({
    notify: false,
    server: ['./dist', './build'],
    scrollRestoreTechnique: 'cookie'
  });

  gulp.watch(paths.main.img.watch, gulp.series(graphics))
    .on('change', browserSync.reload);
  gulp.watch(paths.main.favicon.watch, gulp.series(favs))
    .on('change', browserSync.reload);
  gulp.watch(paths.main.fonts.watch, gulp.series(fonts))
    .on('change', browserSync.reload);
  gulp.watch(paths.main.pug.watch, gulp.series(markup))
    .on('change', browserSync.reload);
  gulp.watch(paths.main.scripts.watch, gulp.series(scripts))
    .on('change', browserSync.reload);
  gulp.watch(paths.main.sass.watch, gulp.series(styles))
    .on('change', browserSync.reload);
  gulp.watch(paths.main.img.svg.watch, gulp.series(svgsprites))
    .on('change', browserSync.reload);
};

export const dev = gulp.series(
  cleaner,
  gulp.parallel(graphics, favs, fonts, markup, scripts, styles, svgsprites)
);
export const build = gulp.series(
  cleaner, graphics, favs, fonts, markup,
  scripts, styles, svgsprites);

export default dev;