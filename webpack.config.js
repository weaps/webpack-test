/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
module.exports = {
	mode: 'development',
	entry: {
		bundle: './src/main.js'
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		// publicPath: '/'
	},
	// 优化项
	// optimization: {
	// 	minimizer: [
	// 		// 开启JS压缩
	// 		new UglifyJsPlugin({
	// 			sourceMap: true, // 开启sourceMap
	// 			cache: true, // 启用缓存
	// 			parallel: true // 并发打包
	// 		})
	// 	]
	// },
	optimization: {
		minimize: process.env.NODE_ENV === 'production',
		minimizer: [
			new TerserJSPlugin({
				sourceMap: true, // 开启sourceMap
				cache: true, // 启用缓存
				parallel: true // 并发打包
			})
		],
		splitChunks: {
			chunks: 'all'
			// cacheGroups: {
			// 	commons: {
			// 		name: "common",
			// 		chunks: "initial",
			// 		minChunks: 2
			// 	}
			// }
		}
	},
	module: {
		rules: [
			{
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
							limit: 8192,
							outputPath: 'images',
							//publicPath: 'http://www.test.com' 也可以单独在某个资源中设置打包后的绝对路径
            }
          }
        ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /\.js$/,
				use: {
					loader: 'eslint-loader',
					options: {
						enforce: 'pre'
					}
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties', // 用于解析class类预提案的功能插件
							'@babel/plugin-transform-runtime'
						]
					},
				},
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.(css|sass)$/,
				use: [
					{
						// use MiniCssExtractPlugin plugins
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	devServer: {
		host: '0.0.0.0',
		hot: true,
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: {
				// collapseWhitespace: true,
				removeComments: true
			}
		}),
		new CleanWebpackPlugin(),
		// MiniCssExtractPlugin 是将css文件单独导出到一个文件里，
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css'
		}),
		// 开启CSS压缩
		// new OptimizeCSSAssetsPlugin({
		// 	cssProcessor: require('cssnano')
		// }),
		new webpack.ProvidePlugin({
			$:'jquery'
		}),
		// new webpack.optimize.CommonsChunksPlugin({
		// 	name: 'vendor',  
    //   filename: 'vendor.bundle.js' 
		// })
		// 启用 HMR
		new webpack.HotModuleReplacementPlugin()
	]
}
/*
	* 安装babel
	* npm i babel-loader @babel/core @babel/preset-env -D
*/