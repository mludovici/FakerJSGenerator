const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './outwebpack'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'index.html',
    template: 'index.html'
  })],
};