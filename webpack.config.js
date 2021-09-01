module.exports = {

    entry: "./src/index.js",

    output: {
        filename: "ppg-sploder-emulator.js"
    },

    mode: "production",
    
    optimization: {
        minimize: false,
        concatenateModules: false
    },
    
}