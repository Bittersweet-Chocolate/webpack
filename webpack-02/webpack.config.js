/*
    构建工具默认采用node的模块化 common.js
*/

const { resolve } = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // use 数组中loader执行顺序从下到上，从右到左执行
          // 创建style标签，将js的样式资源插入，添加到head中生效
          "style-loader",
          // 将css文件变成common.js模块加载到js中，为字符串
          "css-loader"
        ]
      },
      // 打包其他资源
      {
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        options: {
          // 对图片重命名，[hash:10]hash前10位 [ext]原文件拓展名
          name: "[name]-[hash:8].min.[ext]",
          outputPath: "static" //定义输出的图片文件夹
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/, //正则表达式匹配需要优化或者压缩的资源名
      cssProcessor: 'cssnano', //用于压缩和优化CSS的处理器, 默认 cssnano
      cssProcessorPluginOptions: {
        //传递cssProcessor的插件选项,{}
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true //表示插件能够在console中打印信息
    })
  ],
  mode: "development"
}
