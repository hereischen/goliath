const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const bundles = {
    'base': ['jquery', 'lodash'],
    'react': ['react', 'react-dom', 'prop-types', 'react-bootstrap', 'react-select']
};
module.exports = {
    entry: {
        ...bundles,
        ...{
            index: ['./frontend/src/index.js', './frontend/src/style/main.less'
            ]
        }
    },
    output: {
        path: path.resolve(__dirname, 'static', 'frontend'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
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
