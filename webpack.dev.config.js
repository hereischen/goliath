const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.config.js');

module.exports = Merge(CommonConfig, {
    mode: 'development',
    devtool: "inline-source-map",
});