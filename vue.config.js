const path = require('path');
const px2rem = require('postcss-px2rem');

module.exports = {
  // lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5   // 设计稿等分后的rem值   375/10
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      // 处理以/api开头路径的请求
      '/api': {
        target: 'http://localhost:3000', // 转发的目标地址
        pathRewrite: {
          '^/api': ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@common': path.resolve(__dirname, 'src/components/common/'),
        '@recommend': path.resolve(__dirname, 'src/components/recommend/'),
        '@profile': path.resolve(__dirname, 'src/components/profile/'),
        '@playpage': path.resolve(__dirname, 'src/components/playPage'),
        '@less': path.resolve(__dirname, 'src/assets/less/')
      }
    }
  }
}