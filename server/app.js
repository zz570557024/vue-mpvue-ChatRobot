const Koa = require('koa');
const app = new Koa();
// const path = require('path');
// const router = require('koa-router')();
// const views = require('koa-views');
const json = require('koa-json');
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('log4js');
const log = log4js.getLogger('app');
const chat = require('./router/chat')
const stock = require('./router/stock')

// error handler
// onerror(app)
app.proxy = true;
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + 'public'))

// 变量定义
app.use(async (ctx, next) => {
  ctx.state.NODE_ENV = 'development';
  ctx.state.BASE_URL = '/';
  //ctx.state.COOKIE_URL = process.env.COOKIE_URL;
  //ctx.state.API_URL = process.env.API_URL;
  //ctx.state.CMS_URL = process.env.CMS_URL;
  await next()
})

// hander error page
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status == 404) {
      log.error('404url:' + ctx.path);
    } else if (ctx.status == 500) {
      log.error('500url:' + ctx.path);
    }
  } catch (err) {
    log.error(err);
    ctx.state.err = err;
    // await ctx.render('error/500', ctx.state);
  }
})

app.use(chat.routes(), chat.allowedMethods());
app.use(stock.routes(), stock.allowedMethods());

module.exports = app
