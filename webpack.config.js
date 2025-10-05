const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'index.web.tsx'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-reanimated': 'react-native-reanimated/mock',
      'react-native/src/private/devsupport/rndevtools/ReactDevToolsSettingsManager': path.resolve(__dirname, 'src/web/empty.js'),
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'src/web/asyncStorage.ts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules\/(?!(@react-native|react-native|@react-navigation|react-native-gesture-handler|react-native-screens|@react-native-async-storage|react-native-safe-area-context)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'module:@react-native/babel-preset',
              ['@babel/preset-typescript', { allowNamespaces: true }],
            ],
            plugins: [
              'react-native-web'
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    compress: true,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
