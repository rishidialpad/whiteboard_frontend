module.exports = {

    devServer : {
        proxy: {
            '^/v1': {
              target: 'https://api.miro.com/',
              changeOrigin: true
            },
            '^/getToken': {
              target: 'https://whiteboard-server1.herokuapp.com/',
              changeOrigin: true
            },
          },
        disableHostCheck: true

    }
}