const path = require("path");

module.exports = {
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: "less-loader"
      }
    ]
  }
};
