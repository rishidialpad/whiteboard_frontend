module.exports = {

    devServer : {
        proxy: {
            '^/v1': {
              target: 'https://api.miro.com/',
              changeOrigin: true
            },
          },
        disableHostCheck: true

    }
}