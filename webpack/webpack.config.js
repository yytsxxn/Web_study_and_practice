const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTtextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode:'development',
    // development开发环境  production(生产环境) 
    entry:{
        'xx':'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'  
    },
    module:{
        rules:[
            {
                // /  /——正则表达式  \.——转义. 
                test:/\.css$/,
                // use:['style-loader','css-loader']
                // 分离CSS文件
                use:ExtractTtextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:5000,
                            outputPath:'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            // 去掉 ""
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/test.html',
            // 文件名 默认为index.html 在打开时直接显示 index.html
            // filename:'test.html' 
        }),
        new ExtractTtextWebpackPlugin('./index.css')
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8081,
        open:true,
        hot:true
    }
}