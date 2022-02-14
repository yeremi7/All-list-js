const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        contentBase: '../dist',
        port: 3000,
    },
   
};

module.exports = merge(common, devConfig);