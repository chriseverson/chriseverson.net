const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [];
const devMode = process.env.NODE_ENV !== 'production';

plugins.push(new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
}));

if(!devMode) {
  plugins.push(new MiniCssExtractPlugin({
    filename: 'styles/[name].css'
  }))
}

module.exports = {
  entry: join(__dirname, 'src/scripts/'),

  output: {
    path: join(__dirname, 'public'),
    filename: 'scripts/main.js',
  },

  devServer: {
    contentBase: join(__dirname, 'public'),
    publicPath: '/',
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
           devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ],
  },

  plugins: plugins,

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  }
}
