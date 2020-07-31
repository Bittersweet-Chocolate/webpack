const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/js/index.js',
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
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/mian.css'
        })
    ],
    mode: 'development',
    devServer: {
        port: 3000,
        // 告诉本地服务从哪里提供内容且只有在您想要提供静态文件时才需要这样做
        contentBase: resolve(__dirname, "dist"),
        //自动打开浏览器
        open: true,
        compress: true,
        hot: true
    }
}