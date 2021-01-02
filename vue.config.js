const WorkerPlugin = require('worker-plugin')
module.exports={
    publicPath:'/PerlinNoise/',
    configureWebpack: {
        devtool: 'source-map',
        plugins:[
            new WorkerPlugin()
        ]
    }
}