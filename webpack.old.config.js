'use strict';

const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 *  ExtractTextPlugin disable option is common for every instance
 *  so either every instance is disable or enable, but we need to separate
 */
let htmlExtract = new ExtractTextPlugin( 'index.html', { allChunks: true } );
let cssExtract = new ExtractTextPlugin( 'style.min.css', { allChunks: true } );

// css loader sourcemaps crushes file loader relative paths, we dont need that
let cssLoader = NODE_ENV === 'development' ? 'style!css!postcss!resolve-url!sass?sourceMap' : 
                                             cssExtract.extract( 'css?postcss!sass' );

module.exports = {

    debug: true,

    entry: {
        app: "./src/index.js",
    },
    output: {
        path: __dirname + "/dist",
        publicPath: '/',
        filename: "[name].min.js",
    },

    resolve: {
    	modulesDirectories: [ 'node_modules' ],
    	extensions: [ '','.js' ],
        alias: {
          'modernizr': '../../libs/modernizr.js' // only when require in components/
        }
    },

    resolveLoader: {
    	modulesDirectories: [ 'node_modules' ],
    	modulesTemplates: [ '*-loader', '*' ],
    	extensions: [ '','.js' ]
    },

    module: {
    	loaders: [
    		{
    			test: /\.js$/,
    			exclude: /node_modules/,
    			loader: "react-hot"
    		},
    		{
    			test: /\.js$/,
    			exclude: /node_modules/,
    			loader: "babel",
    			query: {
    				presets: [ 'es2015', 'react' ],
    				plugins: [ 'transform-runtime' ],
    				cacheDirectory: '.babel-cache'
    			}
    		},
            
            {
                test: /\.scss$/,
                loader: cssLoader
            },
            {
                test: /\.pug$/,
                // loader: htmlExtract.extract( 'html!pug-html-loader?exports=false' )
                loader: 'pug-html-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=img/[name].[ext]?[hash]!image-webpack?{bypassOnDebug:true,optimizationLevel:7,progressive:true,pngquant:{quality:"65-90",speed:4}}'
            },
            {
                test: /\.(ttf|eot|woff)$/,
                loader: 'file?name=fonts/[name].[ext]?[hash]'
            }
    	]
    },

    postcss: function () {
        return [ autoprefixer ];
    },

    devtool: NODE_ENV === "development" ? "inline-source-map" : null,

    plugins: [
    	new webpack.NoErrorsPlugin(), 
        cssExtract,
        htmlExtract,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _:"underscore"
        })
    ], 

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/dist'
    }

};

if ( NODE_ENV == 'production' ) {
  	module.exports.plugins.push(
  		new webpack.optimize.UglifyJsPlugin({
  			compress: {
  				warnings: false,
  				unsafe: true
  			}
  		})
  	); 		
};