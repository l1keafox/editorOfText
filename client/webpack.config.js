const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest,WorkboxPlugin } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devServer:{
      hot:'only',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      new InjectManifest({
        swSrc: './src/js/sw.js',
        swDest: 'sw.js',
      }), 
      //  new GenerateSW(),
      new WebpackPwaManifest({
        name: 'jate',
        short_name: 'jate',
        description: 'Text editor',
        fingerprints:false,
        inject:false,
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
           
      new MiniCssExtractPlugin()
    ],

    module: {
      rules: [
        { // Rule too add css
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test : /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        { // rule to load bable.
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
                
      ],
      
    },
  };
};
