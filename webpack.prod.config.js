const Merge = require('webpack-merge');
const CommonConfig = require('webpack.common.config');

module.exports = Merge(CommonConfig, {
    mode: 'production',
});