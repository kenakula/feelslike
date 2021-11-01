import merge from "webpack-merge";
import common from "./webpack.common";

const config = merge(common, {
  mode: "production",
  devtool: "cheap-source-map",
  optimization: {
    minimize: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

export default config;
