import path from 'path';
import { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  entry: './src/index',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.svg'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
      assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  output: {
    globalObject: 'this',
    publicPath: '/',
    path: path.join(__dirname, 'root'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/assets/styles/variables/variables.scss',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        common: {
          name: 'common',
          minChunks: 3,
          priority: 1,
          chunks: 'async',
          reuseExistingChunk: true,
          enforce: true,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
      },
    },
    runtimeChunk: true,
    usedExports: true,
    providedExports: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new HtmlWebpackPlugin({
      title: 'React Template',
      baseHref: '/',
      favicon: './public/favicon.ico',
      template: './public/index.html',
    }),
  ],
};

export default config;
