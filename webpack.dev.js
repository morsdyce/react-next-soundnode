'use strict';

const path = require('path');
const webpack = require('webpack');

const publicPath = path.join( __dirname, 'app', 'dist');

module.exports = {
  target: 'electron-renderer',
  devtool: 'eval',
  entry: path.join(__dirname, './app/react/index.js'),
  output: {
    path: path.join(__dirname, './app/dist'),
    filename: 'bundle.js',
    publicPath: `file://${publicPath}/`,
    library: 'soundNodeReact',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ]
};
