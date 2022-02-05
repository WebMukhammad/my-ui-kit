const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = require('path').resolve
const ComponentLibraryGeneration = require('./lib/ComponentLibraryGeneration')
const mode = process.env.NODE_ENV

module.exports = {
  mode,
  target: 'node',
  entry: {
    index: resolve(__dirname, 'src/index.js')
  },
  output: {
    path: resolve(__dirname, 'dist/library'),
    filename: '[name].js',
    library: 'ui-kit',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@src': resolve(__dirname, 'src/'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@img': resolve(__dirname, 'src/assets/img')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-vue']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.(postcss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ComponentLibraryGeneration({
      basePath: __dirname
    }),
    new MiniCssExtractPlugin({
      filename: 'ui-kit.css',
      chunkFilename: '[id].css'
    })
  ]
}
