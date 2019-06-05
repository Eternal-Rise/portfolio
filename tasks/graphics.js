'use strict';

import gulp from 'gulp';

// Include pluginsfor working with graphics
import gulpImagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import zopfli from 'imagemin-zopfli';
import mozjpeg from 'imagemin-mozjpeg';
import giflossy from 'imagemin-giflossy';
import imageminWebp from 'imagemin-webp';
import webp from 'gulp-webp';

const graphics =  (src, dest) => {
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
}

export default graphics;
