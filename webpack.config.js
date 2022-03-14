const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const nodeExternals = require('webpack-node-externals');

const path = require('path');

const BASE_JS = './src/client/js/';

module.exports = {
  // target: 'node',
  // externals: [nodeExternals()],
  entry: {
    main: BASE_JS + 'main.js',
    calendar: BASE_JS + 'calendar.js',
    contestUpload: BASE_JS + 'contestUpload.js',
    badukApi: BASE_JS + 'badukApi.js',
    questionUpload: BASE_JS + 'questionUpload.js',
    answerUpload: BASE_JS + 'answerUpload.js',
    failureUpload: BASE_JS + 'failureUpload.js',
    recorder: BASE_JS + 'recorder.js',
    makeGibo: BASE_JS + 'makeGibo.js',
  },
  // mode: "development",
  // watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
