'use strict';

// Include core
import gulp from 'gulp';
import yargs from 'yargs';

// Include plugins
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'cssnano';

// Include live-reload
import browserSync from 'browser-sync';

// required to async await
import regeneratorRuntime from 'regenerator-runtime';

const webpackConfig = require("./webpack.config.js");
const argv = yargs.argv;
const production = !!argv.production;
const hardClean = !!argv.clean;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

const dest = argv.production ? './build' : './dist';


const paths = {
  main: {
    
    clean: {
      dest: hardClean ? `${dest}/*` : [`${dest}/*`, `!${dest}/**/img`]
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
      img: {
        src: [
          './src/**/*.{jpg,jpeg,png,gif,svg}',
          '!./src/**/svg/*.svg',
          '!./src/**/favicon.{jpg,jpeg,png,gif}'
        ],
        dest: dest,
        svg: {
          src: './src/templates/Barbershop/img/svg/*.svg',
          watch: './src/templates/Barbershop/img/svg/*.svg',
          dest: `${dest}/templates/Barbershop/img/sprites`
        }
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
      img: {
        src: [
          './src/**/*.{jpg,jpeg,png,gif,svg}',
          '!./src/**/svg/*.svg',
          '!./src/**/favicon.{jpg,jpeg,png,gif}'
        ],
        dest: dest,
        svg: {
          src: './src/templates/html5up_forty/img/svg/*.svg',
          watch: './src/templates/html5up_forty/img/svg/*.svg',
          dest: `${dest}/templates/html5up_forty/img/sprites`
        }
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
      img: {
        src: [
          './src/**/*.{jpg,jpeg,png,gif,svg}',
          '!./src/**/svg/*.svg',
          '!./src/**/favicon.{jpg,jpeg,png,gif}'
        ],
        dest: dest,
        svg: {
          src: './src/templates/html5up_multiverse/img/svg/*.svg',
          watch: './src/templates/html5up_multiverse/img/svg/*.svg',
          dest: `${dest}/templates/html5up_multiverse/img/sprites`
        }
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
      img: {
        src: [
          './src/**/*.{jpg,jpeg,png,gif,svg}',
          '!./src/**/svg/*.svg',
          '!./src/**/favicon.{jpg,jpeg,png,gif}'
        ],
        dest: dest,
        svg: {
          src: './src/templates/Tinyone/img/svg/*.svg',
          watch: './src/templates/Tinyone/img/svg/*.svg',
          dest: `${dest}/templates/Tinyone/img/sprites`
        }
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
      img: {
        src: [
          './src/**/*.{jpg,jpeg,png,gif,svg}',
          '!./src/**/svg/*.svg',
          '!./src/**/favicon.{jpg,jpeg,png,gif}'
        ],
        dest: dest,
        svg: {
          src: './src/templates/Travelplus/img/svg/*.svg',
          watch: './src/templates/Travelplus/img/svg/*.svg',
          dest: `${dest}/templates/Travelplus/img/sprites`
        }
      },
      scripts: {
        src: './src/templates/Travelplus/js/index.js',
        dest: `${dest}/templates/Travelplus/js/`
      }
    },
  ]
};

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

const plugins = [
  autoprefixer,
  cssnano({
    preset: [
      'default',
      {
        // production - true / false
        normalizeWhitespace: production,
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
    .pipe(webp(imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    })))
    .pipe(gulp.dest(production ? paths.img.destProd : paths.img.destDev))

    return await console.log('Compressing images...');
}


  // return await console.log('Favicons still generating');


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
  groupmedia,
  autoprefixer,
  cssnano({
    preset: [
      'default',
      {
        cssDeclarationSorter: {
          order: 'smacss'}
      }
    ]
  })
] :
[
  groupmedia,
  autoprefixer, 
  cssnano({
  preset: [
    'default',
    {
      normalizeWhitespace: false,
      cssDeclarationSorter: {
        order: 'smacss'}
    }
  ]})
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
  gulp.parallel(graphics, favs, fonts, markup, scripts, styles, svgsprites)
);
export const build = gulp.series(
  cleaner, graphics, favs, fonts, markup,
  scripts, styles, svgsprites);

export default dev;