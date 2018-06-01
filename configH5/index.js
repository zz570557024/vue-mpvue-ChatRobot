/*
 * @Author: shixinghao 
 * @Date: 2017-12-25 16:07:28 
 * @Last Modified by: shixinghao
 * @Last Modified time: 2018-03-20 10:13:42
 */
module.exports = {
  dev: {
    assetsPublicPath: '/',
    host: '0.0.0.0',
    port: 8080,
    proxyTable: {
      '/static': "http://192.168.1.65:8200",
      '/liang': {
        target: 'http://47.96.167.211:5002',
        pathRewrite: {
          "^/liang": ''
        }
      },
      '/api': {
        target: 'http://www.liangplus.com',
        pathRewrite: {
          "^/api": ''
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
