/*
    构建工具默认采用node的模块化 common.js
*/

const { resolve } = require("path")
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // webpack配置
  // 入口起点
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    // __dirname node的变量，当前文件的目录绝对路径
    path: resolve(__dirname, "build")
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
      },{
        // 图片处理
        test:/\.(jgp|png|gif)$/,
        loader:'url-loader',
        options:{
          // 图片大小小于8kb，就会被base64处理
          // 优点：减少请求数量
          // 缺点：图片体积会更大
          limit: 8*1024
        }
      }
    ]
  },
  // plugins
  plugins: [
    // html
    new htmlWebpackPlugin({
      // 复制 './src/index.html' 文件，自动引入打包输入的所有资源
      template: './src/index.html'
    })
  ],
  // 模式
  //   mode: "production"
  mode: "development"
}
