const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets' }
      ]
    })
  ],
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