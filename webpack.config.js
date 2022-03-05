const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',

    //where to put the output, in the build dir
    path: path.resolve(__dirname, 'build'),
    //  https://webpack.js.org/configuration/output/#outputpublicpath
    publicPath: '/'
  },
  module: {
    rules: [
      /*
        JS with babel
      */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      /*
        HTML
      */ 
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },

      // CSS
      {
        test: /\.css$/,
        use: [MiniCss.loader, "css-loader"]
      },

      // SCSS
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ]
      },

      // json 
      {
        test: /\.(geo|topo)json$/,
        loader: 'json-loader'
      },
      // files (non-svg-images)
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCss({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  devServer: {
    historyApiFallback: true,
    publicPath: '/'
  }
};