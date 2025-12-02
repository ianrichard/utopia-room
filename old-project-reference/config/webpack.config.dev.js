const path = require('path');
const config = require('./webpack.config.js');

const port = 8080;

config.devServer = {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../build'),
    port,
};

if (process.env.GITPOD_WORKSPACE_URL) {
    const workspaceUrl = process.env.GITPOD_WORKSPACE_URL;
    const demoUrl = `https://${port}-${workspaceUrl.split('://')[1]}`;
    config.devServer = {
        ...config.devServer,
        allowedHosts: ['.gitpod.io'],
        sockHost: `${port}-${workspaceUrl.split('://')[1]}`,
        sockPort: 443,
        sockPath: '',
    };
    console.log(`project is running at ${demoUrl}`);
}

config.devtool = 'inline-source-map';

module.exports = config;
