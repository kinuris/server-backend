const path = require("path")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: __dirname,
        filename: "index.bundle.js"
    },
    mode: "development",
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [new NodePolyfillPlugin()]
}