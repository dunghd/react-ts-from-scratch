const path = require("path");
const { optimize } = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const plugins = [];

// Instantiate the plugin.
// The `template` property defines the source
// of a template file that this plugin will use.
// We will create it later.
plugins.push(new HtmlWebPackPlugin({
  template: "./src/index.html",
}));

if (process.env.NODE_ENV === 'production') {
  plugins.push(new optimize.UglifyJsPlugin());
}

module.exports = {
  // Our application entry point.
  entry: "./src/index.tsx",

  // These rules define how to deal 
  // with files with given extensions.
  // For example, .tsx files 
  // will be compiled with ts-loader,
  // a spcific loader for webpack
  // that knows how to work with TypeScript files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  // Telling webpack which extensions
  // we are interested in.
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins,

  // Set up the directory 
  // from which webpack will take the static content.
  // The port field defines which port on localhost
  // this application will take.
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};