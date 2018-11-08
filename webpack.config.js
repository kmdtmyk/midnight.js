const path =  require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'midnight.js',
    library: 'Midnight',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js'],
  },
  devtool: 'source-map',
}
