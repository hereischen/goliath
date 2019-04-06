const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './frontend/src/index.js',
        './frontend/src/style/main.less'
    ],
    output: {
        path: path.resolve(__dirname, 'static', 'frontend'),
        filename: 'main.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          _: 'lodash',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // test: /\.(le|c)ss$/, // .less and .css
                test: /\.less$/,
                exclude: /node_modules/,
                use: [ 
                    'style-loader',
                    'css-loader' ,
                    'less-loader'
                ],
            }
        ]
    }
};
