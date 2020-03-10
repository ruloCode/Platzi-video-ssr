import express from 'express';
import { config } from '../../config/index';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import initialState from '../frontend/initialState';
import reducer from '../frontend/reducers/index';
const app = express()


if (config.dev === 'development') {
    console.log("Developmnet config");

    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const serverConfig = { 
        contentBase: `http://localhost${config.port}`,
        port: config.port, 
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: { colors: true },

    };
    app.use(webpackDevMiddleware(compiler, serverConfig))
    app.use(webpackHotMiddleware(compiler))


}
const setResponse = (html, preloadedState) => {
    return (`
        <!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" href="assets/app.css" type="text/css">
                <title>Platzi Video</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script  >
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                        /</g,
                        '\\u003c'
                    )}
                </script>

                <script src="assets/app.js" type="text/javascript" ></script>
            </body>
        </html>
    `)
}
const renderApp= (req, res) => {
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
      </Provider>,
    );
    res.send(setResponse(html, preloadedState));  
}


app.get('*', renderApp)

app.listen(config.port, (err)=>{
    if (err) {
        console.log(err)
    }
    console.log(`Server running on ${config.host}:${config.port}`)
})