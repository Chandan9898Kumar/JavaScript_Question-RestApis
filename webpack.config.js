const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV !== "production";
dotenv.config();

module.exports = {
  name: "React Webpack",

  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  target: "web",

  entry: {
    bundle: path.resolve(__dirname, "./src/index.js"),
  },

  devtool: isProd ? "eval-cheap-module-source-map" : "source-map",

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],

    alias: {
      process: "process/browser",
    },

    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"],

    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    pathinfo: true,
    filename: process.env.NODE_ENV === "production" ? "[name].[chunkhash].js" : "[name].[fullhash].js",
    chunkFilename: process.env.NODE_ENV === "production" ? "chunk.[name].[chunkhash].js" : "chunk.[name].[fullhash].js",
    libraryTarget: "umd",
    clean: true, // Clean the output directory before emit.
    assetModuleFilename: "[name][ext]",
    sourceMapFilename: "[name].js.map",
  },

  devServer: {
    headers: {
      "access-control-allow-origin": "*",
      "Access-Control-Allow-Credentials": true,
      "cache-control": "private, max-age=31536000",
    },
    server: "http",
    allowedHosts: "auto",

    client: {
      progress: true,
      reconnect: true,
    },
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: ["/"],
      serveIndex: true,
    },
    compress: true,
    hot: true,
    host: "localhost",
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
      },

      // npm i babel-plugin-styled-components  --legacy-peer-deps
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties","babel-plugin-styled-components"],
          },
        },
      },

      {
        test: /\.js$/,
        exclude: [/node_modules/, require.resolve("./public/index.html")],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [require.resolve("@babel/preset-env")],
            plugins: ["@babel/plugin-proposal-class-properties", require.resolve("babel-plugin-styled-components")],
          },
        },
      },

      {
        test: /\.html$/,
        exclude: [/node_modules/, require.resolve("./public/index.html")],
        use: [
          {
            loader: "html-loader",
            options: { minimize: !isProd },
          },
        ],
      },

      //                                                        Image Loader
      //  npm install -D url-loader
      // Webpack can also be used to load static resources such as images, videos, and other binary files.
      // The most generic way of handling such types of files is by using file-loader or url-loader, which will provide a URL reference for the required resources to its consumers.

      // In this section, we will add url-loader to handle common image formats. What sets url-loader apart from file-loader is that if the size of the original file is smaller
      // than a given threshold, it will embed the entire file in the URL as base64-encoded contents, thus removing the need for an additional request.
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8192,
              name: "[path][name].[hash:8].[ext]",
            },
          },
        ],
      },

      //                             Below: npm i image-webpack-loader

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },

      // css-loader: Parses CSS files, resolving external resources, such as images, fonts, and additional style imports.
      // style-loader: During development, injects loaded styles into the document at runtime.
      // npm install -D css-loader style-loader
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties"],
            customize: require.resolve("babel-preset-react-app/webpack-overrides"),
          },
        },
      },

      {
        test: /\.handlebars/,
        use: "handlebars-loader",
        exclude: /node_modules/,
      },

      //   For Scss files
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true, implementation: require("sass") } },
        ],
      },

      //                                        File-loader
      // When we need to reference any other kinds of files, the generic file-loader will do the job. It works similarly to url-loader,
      // providing an asset URL to the code that requires it, but it makes no attempt to optimize it.
      //  npm install -D file-loader
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "[path][name].[hash:8].[ext]",
        },
      },

      //   {
      //     test: /\.(sass|scss|css)$/,
      //     use: [
      //         "style-loader",
      //         {loader: "css-loader",options: { sourceMap: true, importLoaders: 1, modules: false }},
      //         { loader: "postcss-loader", options: { sourceMap: true } },
      //         { loader: "sass-loader", options: { sourceMap: true, implementation: require('sass') } },
      //     ],
      // },
    ],
  },

  plugins: [
    new CleanObsoleteChunks({
      verbose: true,
      deep: true,
    }),

    //  The generated public/index.html file will load our bundle and bootstrap our application.
    new HtmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
      filename: "./index.html",
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
      inject: true,
      hash: true,
      title: "development",
    }),

    new CleanWebpackPlugin({
      root: process.cwd(),
      verbose: true,
      dry: false,
      cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json", "!important.js", "!folder/**/*"],
    }),

    // mini-css-extract-plugin: Extracts loaded styles into separate files for production use to take advantage of browser caching.
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
    }),

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),

    new webpack.HotModuleReplacementPlugin(),

  ],

  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: false,
    // splitChunks: {
    //   chunks: "all",
    //   minSize: 10000,
    //   maxSize: 250000,
    // },
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimizer: [new TerserPlugin({ parallel: true, test: /\.js(\?.*)?$/i, terserOptions: { compress: false, mangle: true, output: { comments: false, ascii_only: true } } })],
    flagIncludedChunks: true,
    usedExports: true,
    sideEffects: true,
  },

  performance: false,

  //                                    Configuring External Webpack Dependencies

  // If we want to include modules from externally hosted scripts, we need to define them in the configuration. Otherwise, Webpack cannot generate the final bundle.
  // We can configure external scripts by using the Webpack externals configuration option. For example, we can use a library from a CDN via a separate <script> tag,
  // while still explicitly declaring it as a module dependency in our project.

  //   externals: {
  //     react: 'React',
  //     'react-dom': 'ReactDOM'
  //  }
};

//         Whenever babel core issue comes up.
// "dependencies": {
//   "@babel/core": "^7.4.5",
//   "core-js": "^2.6.5",
// },

// npm uninstall core-js, delete your node_modules. Then run npm install and npm install core-js



// cross-env :   Run scripts that set and use environment variables across platforms.