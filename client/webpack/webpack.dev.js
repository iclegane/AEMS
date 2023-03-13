const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.default');


module.exports = merge(common, {
    mode: 'development',
    entry: {
        app: '/src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            require.resolve('react-refresh/babel'),
                        ],
                    },
                }
            },
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ReactRefreshPlugin({
            overlay: {
                sockIntegration: 'whm',
            },
        }),
    ],
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