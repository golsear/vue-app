const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const providerResPath = './src/';
const providerResPublicPath = './public/';
const ES6Promise = require("es6-promise");
ES6Promise.polyfill();
//const axios = require("axios");

module.exports = () => {
	// ext=tombs npm run build-typo3-dev-watch
	//let ext = process.env.ext ? process.env.ext : 'bollermann';
    //let providerResPath = './typo3conf/ext/'+ ext + '/Resources/Private/';
    //let providerResPublicPath = './typo3conf/ext/'+ ext + '/Resources/Public/';

    return {
	// Use 'index.js' from the main Provider extension as the entry point.
	entry: path.resolve(__dirname, providerResPath + 'js/index.js'),
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js' // Now the following will work: "import Vue from 'vue';".
		}
	},
	output: {
		filename: 'index.bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, providerResPublicPath + 'js'),
		publicPath: providerResPublicPath + 'js/'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader', // Creates style nodes from JS strings.
				use: 'css-loader' // Translates CSS into CommonJS.
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				// 'resolve-url-loader' may be chained before sass-loader if necessary.
				use: [
					'css-loader',
					'less-loader' // Compiles Less to CSS.
				]
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					{
						loader: 'postcss-loader', // Run post css actions.
						options: {
							plugins: function () { // Post css plugins, can be exported to postcss.config.js.
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					},
					'sass-loader' // Compiles Sass to CSS.
				]
			})
		},
			{
			test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			include: [
				path.resolve(__dirname, providerResPath + 'src/fonts')
			],
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
                    outputPath: '../fonts/',
                    publicPath: ''
				}
			}]
		},
            {
				test: /\.vue$/,
				loader: 'vue-loader',
                options: {
                    loaders: {
                        js: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        sass: 'sass-loader'
                    }
                }
			}]
	},
	plugins: [
		new webpack.ProvidePlugin({ // Inject ES5 modules as global vars.
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
            Promise: 'es6-promise-promise'
		}),
        new CopyWebpackPlugin([
            {
            	from: providerResPath + 'img/',
				to: '../img/',
                noErrorOnMissing: true
            },
            {
                from: providerResPath + 'fonts/',
                to: '../fonts/',
                noErrorOnMissing: true
            }
        ]),
		new ExtractTextPlugin({
			filename: (getPath) => {
				//return getPath('../CSS/[name].css');
				return getPath('../css/index.css');
			}
		})
	]
}
};
