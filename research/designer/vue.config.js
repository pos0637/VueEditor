const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        port: 8081
    },
    chainWebpack: config => {
        config.entry('main').add('babel-polyfill');
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
};
