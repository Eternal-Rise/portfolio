'use strict';

// Include core
import clean from 'gulp-clean';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import webpackStream from 'webpack-stream';
import yargs from 'yargs';

// Include plugins
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

import mqpacker from "css-mqpacker";
import sortCSSmq from "sort-css-media-queries";

// Include pluginsfor working with graphics
import gulpImagemin from 'gulp-imagemin';
// import imagemin from 'imagemin';
import pngquant from 'imagemin-pngquant';
import zopfli from 'imagemin-zopfli';
import mozjpeg from 'imagemin-mozjpeg';
import giflossy from 'imagemin-giflossy';
import imageminWebp from 'imagemin-webp';
import webp from 'gulp-webp';

import favicons from 'gulp-favicons';
import svg from "gulp-svg-sprite";

// Include live-reload
import browserSync from 'browser-sync';

// required to async await
import regeneratorRuntime from 'regenerator-runtime';

const paths = {
  clean: {
    destDev: './dist/*',
    destProd: './build/*'
  },
  favicon: {
    src: './src/img/favicon/favicon.{jpg,jpeg,png,gif}',
    destDev: './dist/img/favicons/',
    destProd: './build/img/favicons/',
    watch: './src/**/favicon.{jpg,jpeg,png,gif}',
  },
  fonts: {
    src: './src/**/*.{ttf,otf,woff,woff2}',
    destDev: './dist/',
    destProd: './build/',
    watch: './src/**/*.{ttf,otf,woff,woff2}'
  },
  img: {
    src: [
      './src/**/*.{jpg,jpeg,png,gif,svg}',
      '!./src/**/svg/*.svg',
      '!./src/**/favicon.{jpg,jpeg,png,gif}'
    ],
    destDev: './dist/',
    destProd: './build/',
    watch: [
      './src/**/*.{jpg,jpeg,png,gif,svg}',
      '!./src/**/svg/*.svg',
      '!./src/**/favicon.{jpg,jpeg,png,gif}'
    ],

    svg: {
      src: './src/**/svg/*.svg',
      watch: './src/**/svg/*.svg',
      destDev: './dist/',
      destProd: './build/',
    }
  },
  pug: {
    src: ['./src/**/*.pug', '!./src/**/blocks/**/*.pug'],
    destDev: './dist/',
    destProd: './build/',
    watch: './src/**/*.pug'
  },
  sass: {
    src: ['./src/**/*.{sass,scss}', '!./src/**/blocks/**/*.{sass,scss}'],
    destDev: './dist/',
    destProd: './build/',
    watch: './src/**/*.{sass,scss}'
  },
  scripts: {
    src: './src/js/index.js',
    destDev: './dist/js/',
    destProd: './build/js/',
    watch: './src/**/*.js'
  },

  templates: [
    // Barbershop
    {
      favicon: {
        src: './src/templates/Barbershop/img/favicon/favicon.{jpg,jpeg,png,gif}',
        destDev: './dist/templates/Barbershop/img/favicons/',
        destProd: './build/templates/Barbershop/img/favicons/',
      },
      js: {
        src: './src/templates/Barbershop/js/index.js',
        destDev: './dist/templates/Barbershop/js/',
        destProd: './build/templates/Barbershop/js/',
      }
    },
    // html5up_forty
    {
      favicon: {
        src: './src/templates/html5up_forty/img/favicon/favicon.{jpg,jpeg,png,gif}',
        destDev: './dist/templates/html5up_forty/img/favicons/',
        destProd: './build/templates/html5up_forty/img/favicons/',
      },
      js: {
        src: './src/templates/html5up_forty/js/index.js',
        destDev: './dist/templates/html5up_forty/js/',
        destProd: './build/templates/html5up_forty/js/',
      }
    },
    // html5up_multiverse
    {
      favicon: {
        src: './src/templates/html5up_multiverse/img/favicon/favicon.{jpg,jpeg,png,gif}',
        destDev: './dist/templates/html5up_multiverse/img/favicons/',
        destProd: './build/templates/html5up_multiverse/img/favicons/',
      },
      js: {
        src: './src/templates/html5up_multiverse/js/index.js',
        destDev: './dist/templates/html5up_multiverse/js/',
        destProd: './build/templates/html5up_multiverse/js/',
      }
    },
    // Tinyone
    {
      favicon: {
        src: './src/templates/Tinyone/img/favicon/favicon.{jpg,jpeg,png,gif}',
        destDev: './dist/templates/Tinyone/img/favicons/',
        destProd: './build/templates/Tinyone/img/favicons/',
      },
      js: {
        src: './src/templates/Tinyone/js/index.js',
        destDev: './dist/templates/Tinyone/js/',
        destProd: './build/templates/Tinyone/js/',
      }
    },
    // Travelplus
    {
      favicon: {
        src: './src/templates/Travelplus/img/favicon/favicon.{jpg,jpeg,png,gif}',
        destDev: './dist/templates/Travelplus/img/favicons/',
        destProd: './build/templates/Travelplus/img/favicons/',
      },
      js: {
        src: './src/templates/Travelplus/js/index.js',
        destDev: './dist/templates/Travelplus/js/',
        destProd: './build/templates/Travelplus/js/',
      }
    },
  ]
};

const webpackConfig = require("./webpack.config.js");
const argv = yargs.argv;
const production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

export const cleaner = () => {
  return gulp.src(production ? paths.clean.destProd : paths.clean.destDev, {read: false})
    .pipe(clean());
}

export const graphics = async () => {
  gulp.src(paths.img.src)
    .pipe(gulpImagemin([
      giflossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2
      }),
      pngquant({
        speed: 5,
        quality: [0.6, 0.8]
      }),
      zopfli({
        more: true
      }),
      mozjpeg({
        progressive: true,
        quality: 70
      }),
      gulpImagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeUnusedNS: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeComments: true },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { collapseGroups: true }
        ]
      })
    ]))
    .pipe(gulp.dest(production ? paths.img.destProd : paths.img.destDev));
    
    gulp.src(paths.img.src)
    .pipe(webp(gulpIf(production, imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    }))))
    .pipe(gulp.dest(production ? paths.img.destProd : paths.img.destDev))

    return await console.log('Compressing images...');
}

const favsConfig = {
  appleIcon: true,
  favicons: true,
  online: false,
  appleStartup: false,
  android: false,
  firefox: false,
  yandex: false,
  windows: false,
  coast: false
};

export const favs = async () => {
  gulp.src(paths.favicon.src)
  .pipe(favicons({
    icons: favsConfig
  }))
  .pipe(gulp.dest(production ? paths.favicon.destProd : paths.favicon.destDev))
  
  for (let template of paths.templates) {
    gulp.src(template.favicon.src)
    .pipe(favicons({
      icons: favsConfig
    }))
    .pipe(gulp.dest(production ? template.favicon.destProd : template.favicon.destDev))
  }

  return await console.log('Favicons still generating');
}

export const fonts = () => {
  return gulp.src(paths.fonts.src)
	  .pipe(gulp.dest(production ? paths.fonts.destProd : paths.fonts.destDev));
}

export const markup = () => {
  return gulp.src(paths.pug.src)
    .pipe(pug({pretty: true}))

    .pipe(gulpIf(production, replace('index.css', 'index.min.css')))
    .pipe(gulpIf(production, replace('index.js', 'index.min.js')))
    
    .pipe(gulp.dest(production ? paths.pug.destProd : paths.pug.destDev));
}

export const scripts = async () => {

  gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulpIf(production, rename({suffix: '.min'})))
    .pipe(gulp.dest(production ? paths.scripts.destProd : paths.scripts.destDev));

  for (let template of paths.templates) {
    gulp.src(paths.scripts.src)
      .pipe(webpackStream({
        mode: production ? 'production' : 'development',
        optimization: {
          minimize: production
        },
        entry: {
          index: template.js.src,
        },
        output: {
          filename: '[name].js',
        },
      
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                query: {
                  presets: [
                    ['@babel/preset-env', { modules: false }]
                  ]
                }
              }
            }
          ]
        },
      
        // resolve: {
        //   alias: {
        //     '%modules%': path.resolve(__dirname, 'src/blocks')
        //   }
        // }
      }))
  
      .pipe(gulpIf(production, rename({suffix: '.min'})))
      .pipe(gulp.dest(production ? template.js.destProd : template.js.destDev));
  }
  return await console.log('magic with js');
}

const plugins = production ? 
[
  autoprefixer,
  cssnano({
    preset: [
      'default',
      {
        cssDeclarationSorter: {
          order: 'smacss'}
      }
    ]
  }),
  mqpacker({
    sort: sortCSSmq
  })
] :
[
  autoprefixer, 
  cssnano({
  preset: [
    'default',
    {
      normalizeWhitespace: false,
      cssDeclarationSorter: {
        order: 'smacss'}
    }
  ]}),
  mqpacker({
    sort: sortCSSmq
  })
]

export const styles = () => {
  return gulp.src(paths.sass.src)
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss(plugins))

    .pipe(gulpIf(production, rename({suffix: '.min'})))
    .pipe(gulpIf(!production, sourcemaps.write()))

    .pipe(gulp.dest(production ? paths.sass.destProd : paths.sass.destDev))
    .pipe(browserSync.stream());
}

export const svgsprites = () => {
  return gulp.src(paths.img.svg.src)
    .pipe(svg({
      shape: {
        dest: "intermediate-svg"
      },
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(production ? paths.img.svg.destProd : paths.img.svg.destDev))
}

export const serve = () => {
  browserSync.init({
    notify: false,
    server: ['./dist', './build'],
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
    .on('change', browserSync.reload);
  gulp.watch(paths.img.svg.watch, gulp.series(svgsprites))
    .on('change', browserSync.reload);
};

export const dev = gulp.series(
  cleaner,
  gulp.parallel(graphics, favs, fonts, markup, scripts, styles, svgsprites),
  serve
);
export const build = gulp.series(
  cleaner, graphics, favs, fonts, markup,
  scripts, styles, svgsprites, serve);

export default dev;