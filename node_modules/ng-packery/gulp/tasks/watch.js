'use strict';

import config from '../config';
import gulp   from 'gulp';

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.scripts.src, ['lint', 'browserify']);
  gulp.watch(config.views.watch, ['views']);
});