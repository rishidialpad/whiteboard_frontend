module.exports = {

    devServer : {
        proxy: {
            '^/v1': {
              target: 'https://api.miro.com/',
              changeOrigin: true
            },
            // '^/getToken': {
            //   target: 'https://whiteboard-server-poc.herokuapp.com/',
            //   changeOrigin: true
            // },
            // '^/getToken': {
            //   target: 'http://localhost:8081/',
            //   changeOrigin: true
            // },

          },
        disableHostCheck: true

    }
}