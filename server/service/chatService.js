const testData = require('../testData/questions')

class chatController {
  defQuestions() {
    return testData.qustions;
  }
  getAnswer(ctx) {
    switch (ctx.query.question) {
      case '今天星期几':
        return {
          message: testData.date
        }
      case '单支股票':
        return {
          message: testData.stock
        };
      case '股票列表':
        return {
          message: testData.stockList
        }
      case '你好':
        return {
          message: testData.hello
        }
      case '讲个故事':
        return {
          message: testData.story
        }
      default:
        return {
          message: testData.other
        }
    }
  }
}

module.exports = new chatController();
