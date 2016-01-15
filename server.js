/**
 * Created by jj on 1/13/16.
 */

var express = require('express');
var path = require('path');

var app = express();
var static_path = path.join(__dirname, 'public');
var defaultPort = 3000;


if (process.env.NODE_ENV == 'production')       // prod environment
{
    console.log('RUNNING PROD MODE');
    app.use(express.static(static_path));
}
else if (process.env.NODE_ENV == 'development')        // dev environment
{
    console.log('RUNNING DEV MODE');

    // ----- do NOT use in production!!!! ------

    var webpack = require('webpack');
    var config = require('./webpack-dev.config.js');
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: false,
        quiet: false,
        publicPath: config.output.path,
        stats: {
            colors: true
        }
    }));

    app.use(require('webpack-hot-middleware')(compiler));

}
else
{
    console.error('UNRECOGNIZED NODE_ENV: ' + process.env.NODE_ENV);
}


app
    .get('/skylink_api_key', function(req, res) {
        console.log('Received request for skylink_api_key');

        res.type('text/plain');
        res.send(process.env.SKYLINK_API_KEY);
    })
    .get('*', function (req, res)
    {
        console.log('get called');

        res.sendFile('index.html', {
            root: static_path
        });
    })
    .listen(process.env.PORT || defaultPort, function (err)
    {
        if (err) { console.log(err); }
        console.log('Listening at localhost:' + (process.env.PORT || defaultPort));
    });

