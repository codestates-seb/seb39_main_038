const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.gif$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
