const path = require('path');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname + '/../', 'dist'),
        filename: 'bundle-[hash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin()],
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
                        ],
                    },
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: 'src/assets/index.html',
            filename: 'index.html',
            favicon: "src/assets/favicon/favicon.ico",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
    ],
};