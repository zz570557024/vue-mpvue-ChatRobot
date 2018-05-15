/*
 * @Author: shixinghao 
 * @Date: 2017-12-25 16:07:35 
 * @Last Modified by: shixinghao
 * @Last Modified time: 2018-03-29 14:11:37
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../configH5');
const baseWebpackConfig = require('./webpack.baseH5.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: 'inline-source-map', //'source-map'
    devServer: {
        contentBase: './dist',
        port: config.dev.port,
        host: config.dev.host,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             warnings: false
        //         }
        //     },
        //     sourceMap: true,
        //     parallel: true
        // }),
        // new ExtractTextPlugin({
        //     filename: 'css/[name].[contenthash].css',
        //     allChunks: true,
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});