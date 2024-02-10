const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV !== 'production';
dotenv.config();

module.exports = {
  name: 'React Webpack',

  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',

  target: 'web',

  entry: {
    bundle: path.resolve(__dirname, './src/index.js'),
  },

  devtool: isProd ? 'eval-cheap-module-source-map' : 'source-map',

  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],

    alias: {
      process: 'process/browser',
    },

    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    pathinfo: true,
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].[fullhash].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? 'chunk.[name].[chunkhash].js' : 'chunk.[name].[fullhash].js',
    libraryTarget: 'umd',
    clean: true, // Clean the output directory before emit.
    assetModuleFilename: '[name][ext]',
    sourceMapFilename: '[name].js.map',
  },

  devServer: {
    headers: {
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Credentials': true,
      'cache-control': 'private, max-age=31536000',
    },
    server: 'http',
    allowedHosts: 'auto',

    client: {
      progress: true,
      reconnect: true,
    },
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: ['/'],
      serveIndex: true,
    },
    compress: true,
    hot: true,
    host: 'localhost',
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        },
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/, require.resolve('./public/index.html')],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, require.resolve('./public/index.html')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test:  /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-proposal-class-properties'],
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
          },
        },
      },
      {
        test: /\.handlebars/,
        use: 'handlebars-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanObsoleteChunks({
      verbose: true,
      deep: true,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: './index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      hash: true,
      title: 'development',
    }),

    new CleanWebpackPlugin({
      root: process.cwd(),
      verbose: true,
      dry: false,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json', '!important.js', '!folder/**/*'],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    minimizer: [new TerserPlugin({ parallel: true, test: /\.js(\?.*)?$/i, terserOptions: { compress: false, mangle: true } })],
  },

  performance: false,
};
