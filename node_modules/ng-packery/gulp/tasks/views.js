'use strict';

import config        from '../config';
import gulp          from 'gulp';
import browserSync   from 'browser-sync';

gulp.task('views', function() {

  gulp.src(config.views.index)
    .pipe(gulp.dest(config.buildDir))
    .pipe(browserSync.stream({ once: true }));

});