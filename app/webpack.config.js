const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')

const fileLoaderExcluded = [/\.html$/, /\.jsx?$/, /\.less$/, /\.css$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
const urlLoaderTest = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]

const lessPlugins = () => [ new LessPluginAutoPrefix({ browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9' ] }) ]
const lessBuildLoader = ExtractTextPlugin.extract({
  use: [
    'css-loader',
    { loader: 'less-loader', options: { plugins: lessPlugins() } }
  ]
})

const paths = {
  src: path.join(__dirname, 'src'),
  dev: path.join(__dirname, 'dev'),
  build: path.join(__dirname, 'build'),
}

const alias = {
   'actions': path.join(paths.src, 'js/redux/actions'),
   'components': path.join(paths.src, 'js/components'),
   'elements': path.join(paths.src, 'js/elements'),
   'layouts': path.join(paths.src, 'js/layouts'),
   'pages': path.join(paths.src, 'js/pages'),
   'utils': path.join(paths.src, 'js/utils')
}

const common = {
  context: paths.src,
  entry: './js',
  output: {
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [ '.js', '.less' ],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: [
          { loader: 'babel-loader', options: { cacheDirectory: true } }
        ]
      }
    ]
  }
}

if (process.env.npm_lifecycle_event === 'bundle:dev') {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      publicPath: '/',
      contentBase: paths.dev,
      port: 3000,
      hot: true,
      disableHostCheck: true,
      host: '0.0.0.0',
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3030',
          secure: false
        },
        '/WSS': {
          target: 'http://localhost:3030',
          secure: false
        }
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new Dotenv()
    ],
    module: {
      rules: [
        { test: /\.jsx?$/, include: paths.src, enforce: 'pre', use: [{ loader: 'eslint-loader', options: { emitWarning: true } }] },
        { loader: 'file-loader', exclude: fileLoaderExcluded, options: { name: 'static/media/[name].[hash:8].[ext]' } },
        { test: urlLoaderTest, loader: 'url-loader', options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' } },
        { test: /\.less$/, include: paths.src, use: [ 'style-loader', 'css-loader', { loader: 'less-loader', options: { plugins: lessPlugins() } } ] },
      ]
    }
  })
}

if (process.env.npm_lifecycle_event === 'bundle:build') {
  module.exports = merge(common, {
    plugins: [
      new ExtractTextPlugin({ filename: 'main.css', allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }),
      new Dotenv()
    ],
    output: { path: paths.build },
    module: {
      rules: [
        { test: /\.jsx?$/, include: paths.src, enforce: 'pre', use: [{ loader: 'eslint-loader', options: { emitWarning: true } }] },
        { loader: 'file-loader', exclude: fileLoaderExcluded, options: { name: 'static/media/[name].[hash:8].[ext]' } },
        { test: urlLoaderTest, loader: 'url-loader', options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]', } },
        {  test: /.less$/, include: paths.src, loader: lessBuildLoader },
      ]
    }
  })
}
