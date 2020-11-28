const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/wishlist/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'wishlist',
      filename: 'remoteEntry.js',
      exposes: {
        './WishlistApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
