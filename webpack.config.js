const path = require('path')

module.exports = {
  entry: './src',
  output: {
    path: __dirname + '/dist',
    filename: 'midnight.js',
    library: 'Midnight',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    extensions: ['.js'],
  },
  devtool: 'inline-source-map',
}
