const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
    // entry {
    //     index: {

    //     }
    // }
    entry: {
        index: path.resolve(__dirname, '../src/routes/Index.jsx'),
        frame: path.resolve(__dirname, '../src/routes/Frame.jsx')
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[hash].js',
        publicPath: '/',
        // chunkLoading: false,
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     }
    // },
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
            chunks: ['index'],
            filename: 'index.html',
            template: path.join(SRC_DIRECTORY, 'index.html'),
        }),
        new HtmlWebpackPlugin({
            chunks: ['frame'],
            filename: 'frame/index.html',
            template: path.join(SRC_DIRECTORY, 'index.html'),
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(SRC_DIRECTORY, 'index.html'),
        // }),
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

if (isDevelopment) {
    const port = 8080;

    config.devServer = {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../build'),
        port,
    };

    config.devtool = 'inline-source-map';
    
    if (process.env.GITPOD_WORKSPACE_URL) {
        const workspaceUrl = process.env.GITPOD_WORKSPACE_URL;
        const demoUrl = `https://${port}-${workspaceUrl.split('://')[1]}`;
        config.devServer = {
            // ...config.devServer,
            // allowedHosts: ['.gitpod.io'],
            // sockHost: `${port}-${workspaceUrl.split('://')[1]}`,
            // sockPort: 443,
            // sockPath: '',
            // make HMR work - start
      host: '0.0.0.0',
      disableHostCheck: true,
      public: require('child_process').execSync('gp url 8080').toString().trim(),
      // make HMR work - end
      
      contentBase: path.join(__dirname, "../build"),    
      port: 8080,
      hot: false,
      inline: false,
    //   watchContentBase: true,        
    //   watchOptions: {
    //       poll: true
    //   },
        };
        console.log(`project is running at ${demoUrl}`);
    }
} else {
    config.mode = 'production';
}

module.exports = config;
