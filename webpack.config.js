require("dotenv/config");
const webpack = require("webpack");
const path = require("path");

const clientPath = path.join(__dirname, "client");
const serverPublicPath = path.join(__dirname, "server/public");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: clientPath,
  output: {
    path: serverPublicPath,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: clientPath,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: process.env.DEV_SERVER_PORT,
    static: {
      directory: serverPublicPath,
      publicPath: "/",
      watch: true,
    },
    proxy: {
      "/api": `http://localhost:${process.env.PORT}`,
    },
  },
  stats: "summary",
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.EnvironmentPlugin(["GOOGLE_MAPS_API_KEY"]),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_WEATHER_API_KEY": JSON.stringify(
        process.env.REACT_APP_WEATHER_API_KEY
      ),
    }),
  ],
};
