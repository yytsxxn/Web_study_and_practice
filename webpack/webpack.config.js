const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTtextWebpackPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const entry = require('./webpack_config/entry_webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode:'development',
    // development开发环境  production(生产环境) 
    entry:entry,
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
                    // use:"css-loader"
                    use:[{
                        loader:"css-loader",
                        options:{
                            importLoaders:1
                        }
                    },'postcss-loader']
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
            },
            {
                // i 忽略大小写
                test:/\.html$/i,
                loader:'html-withimg-loader'
            },
            {
                test:/\.scss$/,
                // loader:['style-loader','css-loader','sass-loader']
                use:ExtractTtextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env']
                        }
                    }
                ],
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            // 去掉 ""
            // minify:{
            //     removeAttributeQuotes:true
            // },
            hash:true,
            template:'./src/test.html',
            // 文件名 默认为index.html 在打开时直接显示 index.html
            // filename:'test.html' 
        }),
        new ExtractTtextWebpackPlugin('./index.css'),
        new webpack.BannerPlugin('小仙女学习史'),
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new CopyWebpackPlugin([{
            from:__dirname+"/src/public",
            to:'./public'
        }])
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