const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const resolve = require('./resolve');

const isProduction = process.env.NODE_ENV === 'production';

const productionPlugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css'
  })
];

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto',
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].js'
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.j|tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {} // options
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              encoding: 'base64'
            }
          }
        ]
      }
    ]
  },
  resolve,
  optimization: {
    usedExports: true,
    minimize: isProduction,
    minimizer: isProduction
      ? [
          new TerserPlugin({
            parallel: true
          })
        ]
      : [],
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
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  },
  externals: {},
  devtool: 'inline-source-map',
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://xxxxx',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    ...(isProduction ? productionPlugins : [])
  ]
};
