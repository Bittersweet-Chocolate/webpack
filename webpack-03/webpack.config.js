const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
    mode:'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style.loader', 'css-loader']
            },
            {
                test: /\.less/,
                use: ['style.loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false
                }
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|git)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        //开发服务器的配置
        port: 3000,
        contentBase: resolve(__dirname, "dist"),
        //自动打开浏览器
        open: true,
        //启动gzip压缩
        compress: true
    }
}