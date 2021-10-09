const path = require('path');

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const purgecssWebpackPlugin = require('purgecss-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		'app': "./src/index.ts",
		'service-worker': "./src/serviceWorker.js",
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, use: 'babel-loader' },
			{ test: /\.tsx?$/, use: 'babel-loader' },
			{
				test: /\.worker\.js$/,
				use: ['worker-loader', 'babel-loader'],
			},
			{
				test: /tailwind\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					// 'style-loader',
					'@teamsupercell/typings-for-css-modules-loader',
					{
					loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: "[local]",
							},
						}
					},
					'postcss-loader',
				],
			},
			{
				test: /\.s?css$/,
				exclude: /tailwind\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					// 'style-loader',
					'@teamsupercell/typings-for-css-modules-loader',
					{
					loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: "[name]--[local]--[hash:base64:8]",
							},
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [path.resolve(process.cwd(), 'src')]
							}
						}
					}
				],
			},
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
	},
	plugins: [
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			template: './src/index.html',
		}),
		new HtmlWebpackHarddiskPlugin(),
		new MiniCssExtractPlugin({
		  filename: '[name].css',
		  chunkFilename: '[id].css',
		  ignoreOrder: false,
		}),
		new purgecssWebpackPlugin({
		  paths: glob.sync(`${path.join(__dirname, 'src')}/**/*.{js,jsx,ts,tsx,html}`, { nodir: true, ignore: [`${path.join(__dirname, 'src')}/**/*.d.ts`] }),
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 3000,
		historyApiFallback: true
	}
};