module.exports = {
  dev: {
    assetsPublicPath: '/',
    host: '0.0.0.0',
    port: 8080,
    proxyTable: {
      '/liang': {
        target: 'http://127.0.0.1:8000',
        pathRewrite: {
          "^/liang": ''
        }
      }
    }
  },
  systemEnv: function () {
    const env = process.env.ENV;
    let systemConfig = {};
    if (env == 'dev') {
      console.log('systemEnv:dev');
      systemConfig = '';
    } else if (env == 'pro') {
      console.log('systemEnv:pro');
      systemConfig = '';
    } else {
      console.log('systemEnv:other');
      systemConfig = '';
    }
    console.log(systemConfig);
    for (let key in systemConfig) {
      systemConfig[key] = JSON.stringify(systemConfig[key])
    }
    console.log(systemConfig);
    return systemConfig;
  }
}
