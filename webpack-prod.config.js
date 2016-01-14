/**
 * Created by jj on 1/13/16.
 */

// ------- WEBPACK PRODUCTION CONFIG -------

var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'eval-source-map',

    entry: [
        './src/entry.jsx'
    ],

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.jsx$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            { test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'css')
            }

        ]
    }
};