const path = require('path');
module.exports = {
    mode:'development',
    // 开发环境  production(生产环境) 
    entry:{
        xx:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'  
    }
}