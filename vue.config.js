// vue.config.js
module.exports = {
chainWebpack: config => {
    // 移除 prefetch preload插件
    config.plugins.delete('prefetch').delete('preload');
    }
};
