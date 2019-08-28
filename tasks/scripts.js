import gulp from 'gulp';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import webpackStream from 'webpack-stream';

const scripts = (src, dest, production) =>
  gulp.src(src)
    .pipe(webpackStream({
      devtool: production ? false : 'source-map',
      mode: production ? 'production' : 'development',
      optimization: {
        minimize: production,
      },
      entry: {
        index: src,
      },
      output: {
        filename: '[name].js',
      },

      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
          },
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
    }))
    .pipe(gulpIf(production, rename({ suffix: '.min' })))
    .pipe(gulp.dest(dest));

export default scripts;
