module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    open: true
  },
  // chainWebpack是与 html-webpack-plugin 插件配置相关的选项
  chainWebpack: config => {
    // 改变 htmlWebpackPlugin.options.title 变量的值为 wang-moba-web
    config.plugin('html').tap(options => {
      options[0].title= 'wang-moba-web'
      return options
    })
  },
  // 关闭 eslint校验
  lintOnSave: false
}
