const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/_api',
      proxy({
        target: 'http://localhost:8080/',
        changeOrigin: true,
      })
    );
  };
  