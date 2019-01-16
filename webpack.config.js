module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'less-loader' // compiles Less to CSS
            }
        ]
    }
};
