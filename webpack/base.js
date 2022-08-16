const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*.otf",
          to: ".",
        },
        {
          from: "./src/assets/apple-icon-180.png",
          to: ".",
        },
      ],
    }),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../"),
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new WebpackPwaManifest({
      theme_color: "#ffffff",
      background_color: "#ffffff",
      scope: ".",
      display: "fullscreen",
      name: "IQOS Promo Game",
      short_name: "IQOS",
      description: "IQOS promo game...",
      // icons: [
      //   {
      //     src: path.resolve("src/assets/logo.png"),
      //     sizes: [96, 128, 192, 256, 384, 512, 1024], // multiple sizes
      //   },
      // ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve("src/sw.js"),
    }),
  ],
};
