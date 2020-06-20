/*
    构建工具默认采用node的模块化 common.js
*/

const { resolve } = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
// 清除打包的dist文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  // webpack配置
  // 入口起点
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    // __dirname node的变量，当前文件的目录绝对路径
    path: resolve(__dirname, "dist")
  },
  // loader
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
      {
        // 图片处理
        // file-loader 和 url-loader
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          { 
            // 找每个html/css文件引用的img路径
            loader: "url-loader",
            options: {
              // 对图片重命名，[hash:10]hash前10位 [ext]原文件拓展名
              name: "[name]-[hash:8].min.[ext]",
              limit: 8 * 1024, // 表示小于8kb的图片转为base64,大于8kb的是路径
              outputPath: "images", //定义输出的图片文件夹
              // html-loader导入图片是common.js
              // 解析时出现 [object module]
              // 关闭url-loader的es6模块化，使用common.js解析即可
              // esModules: false
            }
          }
        ]
      },
      {
        test: /\.html$/,
        // 处理html中的img文件（负责引入img，从而能被url-loader处理）
        loader: "html-loader"
      }
    ]
  },
  // plugins
  plugins: [
    //  传入数组,指定要删除的目录
    new CleanWebpackPlugin(),
    // html
    new htmlWebpackPlugin({
      // 复制 './src/index.html' 文件，自动引入打包输入的所有资源
      template: "./src/index.html"
    })
  ],
  // 模式
  //   mode: "production"
  mode: "development"
}
