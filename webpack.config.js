var LiveReloadPlugin = require("webpack-livereload-plugin")
var IconsPlugin = require("icons-loader/IconsPlugin")

module.exports = {
  target: "node",
  entry: "./server.babel.js",
  output: {
    path      : __dirname,
    filename  : "server.dist.js",
  },
  resolve: {
    root: [ __dirname ],
    extensions : ["", ".js", ".json", ".svg"]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015", "stage-0"]
        }
      }, {
        test:  /\.json$/,
        loader: "json-loader"
      }, {
        test: /\.svg$/,
        loader: "icons-loader"
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin(),
    new IconsPlugin({
      fontName: "daniellacosse-icons",
      formats: [ "woff" ]
    })
  ]
};
