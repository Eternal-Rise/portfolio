import gulp from 'gulp';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import webpackConfig from '../webpack.config';
import webpackStream from 'webpack-stream';

const scripts = (src, dest, templates, production) => {
  gulp.src(src)
    .pipe(webpackStream(webpackConfig))

    .pipe(gulpIf(production, rename({suffix: '.min'})))
    .pipe(gulp.dest(dest));

    for (let template of templates) {
      gulp.src(src)
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
        .pipe(gulp.dest(template.scripts.dest));
    }
}

export default scripts;