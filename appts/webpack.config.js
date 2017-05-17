var webpack = require("webpack");
module.exports = {
	entry: "./src/appts.js",
	output:  {
		filename: "./final/readyapp.js"
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