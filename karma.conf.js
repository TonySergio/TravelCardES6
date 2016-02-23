module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS'],

        files: [
            {   pattern: 'test-context.js'},
            'node_modules/babel-polyfill/dist/polyfill.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
        ],

        frameworks: ['jasmine'],

        preprocessors: {
            'test-context.js': ['webpack']
        },

        webpack: {
            module: {
                loaders: [
                    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
                ]
            },
            watch: true
        }
    });
};