const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';

const dynamicPlugins = isProduction
  ? [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      })
    ]
  : [];

module.exports = {
  entry: './src/index.tsx', // 必须
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].js'
  }, // 必须
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.j|tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () =>
                  autoprefixer({
                    browsers: ['last 2 versions', '> 1%']
                  })
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      styles: path.resolve(__dirname, 'src/styles')
    }
  },
  optimization: {
    usedExports: true,
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\/]node_modules[\/]react[\/]/,
          name: 'chunk-react',
          priority: 9
        },
        reactRouterDom: {
          test: /[\/]node_modules[\/]react-router-dom[\/]/,
          name: 'chunk-react-router-dom',
          priority: 8
        },
        reactDom: {
          test: /[\/]node_modules[\/]react-dom[\/]/,
          name: 'chunk-react-dom',
          priority: 7
        },
        lodash: {
          test: /[\/]node_modules[\/]lodash[\/]/,
          name: 'chunk-lodash',
          priority: 6
        }
      }
    }
  },
  devtool: 'source-map',
  devServer: {
    port: 8000,
    host: '0.0.0.0'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    ...dynamicPlugins
  ]
};
