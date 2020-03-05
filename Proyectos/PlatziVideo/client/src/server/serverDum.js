import express from 'express';
import { config } from '../../config/index';
import webpack from 'webapack';
const app = express();

if(config.dev === 'development') {
    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const serverConfig = { port: config.port, hot: true};
    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler))
}