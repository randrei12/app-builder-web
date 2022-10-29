const path = require('path');
// const fs = require('fs');

// function getAllFiles(location) {
//     let dirData = fs.readdirSync(location);
//     let obj = {};
//     dirData.forEach(file => {
//         let currentPath = path.join(location, file);
//         if (fs.lstatSync(currentPath).isDirectory()) return Object.assign(obj, getAllFiles(currentPath)); 
//         obj[file.substring(0, file.lastIndexOf('.'))] = currentPath;
//     });
//     return obj;
// }

module.exports = [{
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
}];