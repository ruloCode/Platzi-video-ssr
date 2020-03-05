import express from 'express';
import { config } from '../../config/index';
import webpack from 'webpack'
const app = express()


if (config.dev === 'development') {
    console.log("Developmnet config");

    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const serverConfig = { port: config.port, hot: true};
    app.use(webpackDevMiddleware(compiler, serverConfig))
    app.use(webpackHotMiddleware(compiler))


}


app.get('*',(req, res)=>{
    res.send(`
    <!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" href="assets/app.css" type="text/css">
                <title>Platzi Video</title>
            </head>
            <body>
                <div id="app"></div>
                <script src="assets/app.js" type="text/javascript" ></script>
            </body>
        </html>
    `)
})

app.listen(config.port, (err)=>{
    if (err) {
        console.log(err)
    }
    console.log(`Server running on ${config.host}:${config.port}`)
})