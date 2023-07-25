const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  devServer: {
    port: 8080, //  配置端口号
    host: "localhost", // 访问地址
    open: true, //  自动打开浏览器

    // 配置代理服务器，处理跨域
    proxy: {
      '/api': {
        // target: 'http://39.98.123.211:8510',
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewirte: { '^/api': '' }  // 路径重写
      }
    }
  }
})
