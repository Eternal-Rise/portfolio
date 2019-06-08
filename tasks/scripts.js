import gulp from 'gulp';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
// import webpackConfig from '../webpack.config';
import webpackStream from 'webpack-stream';

const scripts = (src, dest, production) => {
  return gulp.src(src)
    .pipe(webpackStream({
      mode: production ? 'production' : 'development',
      optimization: {
        minimize: production
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
    .pipe(gulpIf(production, rename({suffix: '.min'})))
    .pipe(gulp.dest(dest));
}

export default scripts;