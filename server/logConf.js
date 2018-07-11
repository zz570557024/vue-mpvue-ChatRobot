module.exports = {
  appenders: {
    out: {
      type: 'stdout'
    },
    bussDate: {
      type: 'dateFile',
      filename: '/mydata/log/node-www/buss.log'
    },
    accessDate: {
      type: 'dateFile',
      filename: '/mydata/log/node-www/access.log'
    },
    globalError: {
      type: 'dateFile',
      filename: '/mydata/log/node-www/error.log'
    },
    error: {
      type: 'logLevelFilter',
      appender: 'globalError',
      level: 'error'
    }
  },
  categories: {
    // 默认输出
    default: {
      appenders: ['out', 'bussDate', 'error'],
      level: 'debug'
    },
    // 访问输出
    access: {
      appenders: ['out', 'accessDate', 'error'],
      level: 'debug'
    }
  }
}
