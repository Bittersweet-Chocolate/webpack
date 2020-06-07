/*
 index.js   webpack 入口文件
 
 1.运行指令
    开发环境：webpack ./src/index.js -o ./build/built.js -mode=development
        webpack以 ./src/index.js 为入口文件 打包后输出到 ./build/built.js
    生产环境：webpack ./src/index.js -o ./build/built.js -mode=production     
 2.结论
    webpack 能处理js、json文件   不能处理css/img等资源
 */
import data from './data.json'
console.log(data)
import './index.css'
function add(x,y){
    return x+y
}
console.log(add(1,2))