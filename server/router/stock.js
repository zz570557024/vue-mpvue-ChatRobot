const router = require('koa-router')();
var log4js = require('log4js');
var log = log4js.getLogger("chatLog");
const stockService = require('../service/stockService')

router.prefix('/stock');

router.get('/stockRealTime', async (ctx, next) => {
  try {
    ctx.body = stockService.stockRealTime();
  } catch (err) {
    log.info(err)
  }
})

router.get('/priceMonthly', async (ctx, next) => {
  try {
    ctx.body = stockService.priceMonthly(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/priceWeekly', async (ctx, next) => {
  try {
    ctx.body = stockService.priceWeekly(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/priceDaily', async (ctx, next) => {
  try {
    ctx.body = stockService.priceDaily(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/timeShareWeek', async (ctx, next) => {
  try {
    ctx.body = stockService.timeShareWeek(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/stockNews', async (ctx, next) => {
  try {
    ctx.body = stockService.stockNews(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/stockAnnouncement', async (ctx, next) => {
  try {
    ctx.body = stockService.stockAnnouncement(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/stockReport', async (ctx, next) => {
  try {
    ctx.body = stockService.stockReport(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/stockSummary', async (ctx, next) => {
  try {
    ctx.body = stockService.stockSummary(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/capitalFlowsMain', async (ctx, next) => {
  try {
    ctx.body = stockService.capitalFlowsMain(ctx);
  } catch (err) {
    log.info(err)
  }
})

router.get('/capitalFlows', async (ctx, next) => {
  try {
    ctx.body = stockService.capitalFlows(ctx);
  } catch (err) {
    log.info(err)
  }
})

module.exports = router;
