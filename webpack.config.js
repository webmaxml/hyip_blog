'use strict';

const webpack = require( 'webpack' );
const autoprefixer = require( 'autoprefixer' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ReloadPlugin = require( 'reload-html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const NODE_ENV = process.env.NODE_ENV || 'development';

let cssExtract = new ExtractTextPlugin( 'style.min.css', { allChunks: true } );

// css loader sourcemaps crushes file loader relative paths, we dont need that
let cssLoader = NODE_ENV === 'development' ? 'style!css!postcss!resolve-url!sass?sourceMap' : 
                                             cssExtract.extract( 'css?postcss!sass' );

module.exports = {

    debug: true,

    entry: {
        app: [ 'babel-polyfill', './src/index.js' ],
    },

    output: {
        path: __dirname + "/dist",
        publicPath: '/',
        filename: "[name].min.js",
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/dist'
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
                loader: 'pug?pretty=true'
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/ui/pug/blog_index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'post.html',
            template: 'src/ui/pug/blog_item.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'hyip_index.html',
            template: 'src/ui/pug/hyip_index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'hyip.html',
            template: 'src/ui/pug/hyip_item.pug'
        }),
        new ReloadPlugin(),
        new webpack.NoErrorsPlugin(), 
        cssExtract,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _:"underscore"
        })
    ]   
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