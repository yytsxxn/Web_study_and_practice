const path = require('path');
module.export = {
    entry:{
        xx:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'/dist'),
        filename:'[name].js'
    }
}