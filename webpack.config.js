const path = require('path');

module.exports = {
    entry: './views/ts/project/script.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'project.js',
        path: path.resolve(__dirname, 'views', 'js'),
    },
};