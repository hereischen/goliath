const path = require('path');

module.exports = {
    entry: [
        './frontend/src/index.js',
        './frontend/src/main.less'
        ],
    output: {
        path: path.resolve(__dirname, 'static', 'frontend'),
        filename: 'main.js'
    },
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
                test: /\.less$/, // .less and .css
                exclude: /node_modules/,
                use: [ 
                    'style-loader',
                    'css-loader' ,
                    'less-loader'
                ],
            }
        ]
    }
};
