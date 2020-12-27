const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        products: `products@${domain}/products/latest/remoteEntry.js`,
        wishlist: `wishlist@${domain}/wishlist/latest/remoteEntry.js`,
        users: `users@${domain}/users/latest/remoteEntry.js`,
        cart: `cart@${domain}/cart/latest/remoteEntry.js`,
        orders: `ordes@${domain}/orders/latest/remoteEntry.js`,
        search: `search@${domain}/search/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
