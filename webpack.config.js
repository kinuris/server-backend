const NodeExternals = require("webpack-node-externals")
const webpack = require("webpack")

module.exports = (env) => {

    console.log(env)

    return {
        entry: "./src/index.ts",
        output: {
            path: __dirname,
            filename: "index.bundle.js"
        },
        mode: env.prod ? "production" : "development" ,
        target: "node",
        externalsPresets: { node: true },
        externals: [NodeExternals()],
        module: {
            rules: [
                {
                    test: /\.ts/,
                    loader: "ts-loader"
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
           
        },
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^pg-native$/
            }),
            // new NodePolyfillPlugin(),
        ],
        experiments: {
            topLevelAwait: true
        }
    }
}