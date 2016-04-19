'use strict';

export default {

    browserPort: 3000,
    UIPort: 3001,

    sourceDir: './app/',
    buildDir: './build/',
    nodeDir: './node_modules/',

    scripts: {
        src: 'app/**/*.js',
        dest: 'build'
    },

    assetExtensions: [
        'js',
        'css',
        'png',
        'jpe?g',
        'gif',
        'svg',
        'eot',
        'otf',
        'ttc',
        'ttf',
        'woff2?'
    ],

    browserify: {
        bundleName: 'angular-packery.js',
        prodSourcemap: false
    },

    views: {
        index: 'app/index.html',
        src: 'app/views/**/*.html',
        dest: 'app/js'
    },

    test: {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    },

    init: function () {
        this.views.watch = [
            this.views.index
        ];

        return this;
    }
}.init();
