const path = require('path');
module.exports = {
  entry: "./src/mskcows",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["*", ".js"]
  }
};