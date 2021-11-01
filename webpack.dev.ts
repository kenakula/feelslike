import merge from "webpack-merge";
import common from "./webpack.common";

const config = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    open: true,
  },
});

export default config;
