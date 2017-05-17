var webpack = require("webpack");
module.exports = {
	entry: "./src/main.js",
	output: {
		filename: "./final/final.js"
	},
	devServer: {
		inline: true,
		contentBase: "./final",
		watchContentBase: true,
		port: 4000
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: ["react"]
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
				//options: {minimize: true}
			}
		]
	}
	// plugins: [
	// 	new webpack.optimize.UglifyJsPlugin()
	// ]
}