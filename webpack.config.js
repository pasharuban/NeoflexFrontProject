const path = require("path");

module.exports = {
  mode: "production",
  entry: "./scripts/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  devtool: "source-map",
};
