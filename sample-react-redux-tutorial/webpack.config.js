const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: "ts-loader"
              }
          ]
      },
      {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
