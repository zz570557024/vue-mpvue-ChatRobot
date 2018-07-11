const router = require('koa-router')();
var log4js = require('log4js');
var log = log4js.getLogger("chatLog");
const chatService = require('../service/chatService')

router.prefix('/chat');

router.get('/test', async (ctx, next) => {
  try {
    ctx.body = '111111';
  } catch (err) {
    log.info(err);
  }
})

router.get('/defQuestions', async (ctx, next) => {
  try {
    ctx.body = chatService.defQuestions();
  } catch (err) {
    log.info(err)
  }
})

router.get('/getAnswer', async (ctx, next) => {
  try {
    ctx.body = chatService.getAnswer(ctx);
  } catch (err) {
    log.info(err)
  }
})

module.exports = router;
