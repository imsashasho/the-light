const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ignore = new webpack.IgnorePlugin(new RegExp('/(node_modules|ckeditor)/'));

const config = {
  mode: 'development',
  entry: {
    index: './src/assets/scripts/index.js',
    location: './src/assets/scripts/location.js',
    construction: './src/assets/scripts/construction.js',
    services: './src/assets/scripts/services.js',
    developmentProcess: './src/assets/scripts/development-process.js',
    news: './src/assets/scripts/news.js',
    404: './src/assets/scripts/404.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    // ignore,
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
};

module.exports = config;
