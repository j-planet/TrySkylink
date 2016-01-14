/**
 * Created by jj on 1/13/16.
 */

// ------- WEBPACK DEV CONFIG -------

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',

    entry: [
        'webpack-hot-middleware/client',
        './src/entry.js'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        color: true,

        port: 3000
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            { test: /\.jsx$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src') },
            { test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src') },
            { test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'css') },
            { test: /\.css$/,
                loader: 'style!css' }
        ]
    }
};