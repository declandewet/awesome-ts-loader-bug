const extend = (x, y) => Object.assign({}, x, y)

const shared = {
  output: {
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: [
      './src',
      'node_modules'
    ]
  },
  module: {
    rules: [
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.ts$/, use: 'awesome-typescript-loader' }
    ]
  }
}

const output = shared.output

const client = extend(shared, {
  entry: './src/client.ts',
  output: extend(output, {
    path: './dist/assets'
  })
})

const server = extend(shared, {
  entry: { server: './src/server.ts' },
  target: 'node',
  output: extend(output, {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  }),
  externals: /^[a-z\-0-9]+$/
})

module.exports = [client, server]