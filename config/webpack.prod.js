const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
}

module.exports = merge(common, prodConfig);