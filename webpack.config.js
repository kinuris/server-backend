const path = require("path")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

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
        module: {
            rules: [
                {
                    test: /\.ts/,
                    loader: "ts-loader"
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"]
        },
        plugins: [new NodePolyfillPlugin()]
    }
}