var path = require('path');
var webpack = require('webpack');
var ImageminPlugin = require('imagemin-webpack-plugin').default;


cssLoaders = ['style-loader', 'css-loader', 'postcss-loader'];
var config = {
    entry: './main.js',

    // output: {
    //     filename: 'index.js'
    // },
    output: { // Compile into js/build.js
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    devServer: {
        inline: true,
        port: 8000
    },
    plugins : [// Plugins for Webpack
            new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
                compress: {
                    warnings: false, // ...but do not show warnings in the console (there is a lot of them)
                    drop_console: true
                },
                output: {
                    comments: false,
                },
            }),
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }, "build"),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass?sourceMap']
            }, {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "url-loader?limit=10000"
            }
        ]
    }
}

module.exports = config;
