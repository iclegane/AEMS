const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.default');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [],
    },
    devServer: {
        static: {
            directory: path.join(__dirname + '/../', 'dist'),
        },
        historyApiFallback: true,
        compress: false,
        open:false,
        hot: true,
        port: 8080,
    },
});