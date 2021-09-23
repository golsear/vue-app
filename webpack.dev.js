const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common')();


module.exports = merge(common, {
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			test: /\.js$/,
			filename: '[file].map',
			append: `\n//# sourceMappingURL=${common.output.publicPath}[url]`
		})
	]
});
