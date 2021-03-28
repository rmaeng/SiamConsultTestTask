const path = require('path');

module.exports = {
    mode: 'development',
    entry: './Client/index.jsx',
    output: {
        path: path.resolve(__dirname, './wwwroot/dist'),
        filename: 'bundle.js'
    }
};