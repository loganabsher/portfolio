'use strict';

const Dotenv = require('dotenv-webpack');

const production = process.env.NODE_ENV === 'development';
const CDN_URL = process.env.CDN_URL || '/';

console.log(CDN_URL);

const {DefinePlugin, EnvironmentPlugin} = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let plugins = [
  new Dotenv(),
  new EnvironmentPlugin(['NODE_ENV']),
  new MiniCssExtractPlugin('bundle-[hash].css'),
  new HTMLPlugin({template: `${__dirname}/src/index.html`}),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    API_URL: JSON.stringify(process.env.API_URL),
  }),
];
if(production) plugins = plugins.concat([new CleanPlugin(), new UglifyPlugin()]);
module.exports = {
  plugins,
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'cheap-module-eval-source-map',
  output: {
    // path: `${__dirname}/build`,
    path: `${__dirname}/src/index.html`,
    publicPath: CDN_URL,
    filename: 'bundle-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              includePaths: [`${__dirname}/src/style`],
            }
          },
          'css-loader',
          'sass-loader',
          'resolve-url-loader'
        ],
      },
      {
        test: /\.icon.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(woff|woff2|ttf|eot).*/,
        exclude: /\.icon.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.icon.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 60000,
              name: 'image/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp3|aac|aiff|wav|flac|m4a|ogg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'audio/[name].[ext]' },
          },
        ],
      },
    ],
  },
};
