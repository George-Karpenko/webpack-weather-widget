const path = require("path");
const glob = require("glob-all");
const webpack = require("webpack");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

module.exports = (env, argv) => {
  const config = {
    entry: "./src/main.ts",
    output: {
      path: dist,
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": src,
      },
    },
    mode: argv.mode,
    devServer: {
      static: dist,
    },
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: ['echo "Webpack Start"'],
          blocking: true,
          parallel: false,
        },
        onBuildEnd: {
          scripts: ['echo "Webpack End"'],
          blocking: false,
          parallel: true,
        },
      }),
      new MiniCssExtractPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new PurgeCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, "./index.html"),
          path.join(__dirname, "./src/**/*.vue"),
          path.join(__dirname, "./src/**/*.js"),
        ]),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loader: {
              scss: "vue-style-loader!css-loader!sass-loader",
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            "vue-style-loader",
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 1,
                modules: true,
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: () => {
                    [require("autoprefixer")];
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader",
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 1,
                modules: true,
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: () => {
                    [require("autoprefixer")];
                  },
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "node_modules",
            chunks: "all",
          },
        },
      },
    },
  };

  return config;
};