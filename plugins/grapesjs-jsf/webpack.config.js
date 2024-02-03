const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const pkg = require('./package.json');
const webpack = require('webpack');
const path = require("path");
const name = pkg.name;
let plugins = [];
let optimization = {};

module.exports = (env = {}) => {
    if (env.production) {
        optimization.minimizer = [
            new TerserPlugin({
                parallel: true,
            })
        ];
        plugins = [
            new webpack.BannerPlugin(`${name} - ${pkg.version}`),
        ]
    } else {
        plugins.push(new HtmlWebpackPlugin({
            title: 'grapesjs jsf',
            template: './src/index.html', // your custom template
            scriptLoading: 'blocking'
            //inject: 'body'
          }));
    }

    return {
        mode: env.production ? 'production' : 'development',
        entry: path.resolve (__dirname, 'src/index.ts'),
        devtool: 'inline-source-map',
        output: {
            path: path.resolve (__dirname, 'dist'),
            publicPath: "",
            filename: `${name}.min.js`,
            libraryTarget: 'global',
            library: 'grapesjs-jsf',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                },
                // {
                //     test: /\.js$/,
                //     loader: 'babel-loader',
                //     include: /src/,
                // }
            ],
            noParse: [require.resolve("typescript/lib/typescript.js")],

        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            fallback: {
                "path": require.resolve("path-browserify")
              },
            //   target: 'node',
        },
        devServer: {
            port: 18080,
            open: '/',
            // devMiddleware: {
            //     mimeTypes: { phtml: 'text/html' }
            // },
            static: [
              {
                directory: path.join(__dirname, "public"),
                publicPath: "/",
              },
            ]
        },
        externals: {'grapesjs': 'grapesjs'},
        optimization: optimization,
        plugins: plugins,
        // watchOptions: {
        //     ignored: /node_modules/
        // }
    };
};
