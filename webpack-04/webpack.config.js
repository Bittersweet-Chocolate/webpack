const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/main.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [

                    // 'style-loader',
                    // 取代style-loader。提前js中的css成独立文件
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    mode:'development'
}