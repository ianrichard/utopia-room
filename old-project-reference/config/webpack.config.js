const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
    entry: [path.resolve(__dirname, '../src/Index.jsx')],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [path.resolve('node_modules'), 'node_modules'],
    },
    performance: {
        hints: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SRC_DIRECTORY, 'index.html'),
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
        // new MonacoWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.join(SRC_DIRECTORY, 'assets'),
        //             to: path.join(ROOT_DIRECTORY, 'build'),
        //         },
        //     ],
        // }),
    ].filter(Boolean),
    module: {
        rules: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            // {
			// 	test: /\.css$/,
			// 	use: ['style-loader', 'css-loader']
			// },
			// {
			// 	test: /\.ttf$/,
			// 	use: ['file-loader']
			// },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                isDevelopment &&
                                    require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = config;
