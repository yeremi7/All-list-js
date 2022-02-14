const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require('path');


/**@type {import('webpack').Configuration} */
module.exports = {
  
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/i,
                exclude: /style\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /style\.css$/i,
                use: [ MiniCssExtractPlugin.loader , 'css-loader' ],  
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'img/[name].[ext]'
                        }
                    }
                ],
                type: 'asset', 
            },
        ],
    },

    entry: './src/index.js',
    output: {  
        path: path.resolve(__dirname, '../dist'),
        filename: '[bundle].[contenthash].js',
        publicPath: '', 
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin()
    ],
    
    
};