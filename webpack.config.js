const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => ({
    entry: {
        main: './src/main.js'
    },
    devtool: argv.mode === 'production' ? false : 'eval-cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename:
            argv.mode === 'production'
                ? 'chunks/[name].[chunkhash].js'
                : 'chunks/[name].js',
        filename:
            argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:
                argv.mode === 'production'
                    ? '[name].[contenthash].css'
                    : '[name].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin(
            {
                patterns: [{
                    from: './src/assets',
                    to: './assets',
                }, {
                    from: './src/style',
                    to: "./style"
                }]
            },
        ),
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ],
    devServer: {
        contentBase: 'dist',
        watchContentBase: true,
        port: 8989
    }
});
