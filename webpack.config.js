// const deps = require("./package.json").dependencies;
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, "public", "index.html"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // Aceitar conexões de hosts específicos (ngrok, localhost, etc.)
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      ".ngrok-free.app", // Permite acesso ao ngrok
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:3000/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new ModuleFederationPlugin({
    //   name: "host",
    //   remotes: {
    //     remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js",
    //   },
    // }),
  ],
};
