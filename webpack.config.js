const path = require("path"),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      autoprefixer = require('autoprefixer');

const ROOT_DIR = path.join(__dirname);
const SRC_DIR = path.join(ROOT_DIR, 'src');
const CSS_DIR = path.join(SRC_DIR, 'css');
const STATIC_DIR = path.join(ROOT_DIR, 'static')


const extractSass = new ExtractTextPlugin({
  filename: 'master.css',
});

const CSSRules = {
  test: /\.scss$/,
  use: extractSass.extract({
    use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          sourceMap: true,
          importLoaders: 2
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded'
        }
      }
    ],
    // use style-loader in development
    fallback: 'style-loader'
  })
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: "./index.ts",
  output: {
    path: path.join(ROOT_DIR, 'build'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ["*", ".js", ".ts", ".tsx"],
    alias: {
      'images': path.join(SRC_DIR, 'assets', 'img'),
    }
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
        { from: STATIC_DIR }
    ])
  ],
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
      CSSRules,
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=assets/img/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      }
      
    ]
  }
}
