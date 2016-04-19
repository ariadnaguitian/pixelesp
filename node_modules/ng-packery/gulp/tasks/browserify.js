'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import ngAnnotate   from 'browserify-ngannotate';

function createSourcemap() {
    return !global.isProd || config.browserify.prodSourcemap;
}

function buildScript(file) {

    var bundler = browserify({
        entries: [config.sourceDir + file],
        baseDir: config.sourceDir,
        debug: false,//createSourcemap(),
        cache: {},
        packageCache: {},
        fullPaths: false,
    });

    bundler.external('jQuery');

    if (!global.isProd) {
        bundler = watchify(bundler);

        bundler.on('update', () => {
            rebundle();
            gutil.log('Rebundle...');
        });
    }

    const transforms = [
        {'name': babelify, 'options': {}},
        {'name': ngAnnotate, 'options': {}}
    ];

    transforms.forEach((transform) => {
        bundler.transform(transform.name, transform.options);
    });

    function rebundle() {
        const stream = bundler.bundle();
        const sourceMapLocation = global.isProd ? './' : '';

        return stream.on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulpif(createSourcemap(), buffer()))
            .pipe(gulpif(createSourcemap(), sourcemaps.init({loadMaps: true})))
            .pipe(gulpif(global.isProd, streamify(uglify({
                mangle: true,
                compress: {drop_console: true}
            }))))
            .pipe(gulpif(createSourcemap(), sourcemaps.write(sourceMapLocation)))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(browserSync.stream());
    }

    return rebundle();

}

gulp.task('browserify', function () {

    return buildScript('angular-packery.js');

});
