const testData = require('../testData/questions')
const MD5 = require('../libs/MD5')
const Util = require('../libs/http')
const NLPUrl = "https://cn.olami.ai/cloudservice/api";
const appkey = "80ccf2fdeba243f49c014af42f571e25"; //语义接口appkey
const appSecret = "22cd5040b9d347f2b338eeb46f1770be"; //语义接口appSecret
const api = 'nli'; //语义接口api

class chatController {
  defQuestions() {
    return testData.qustions;
  }
  evaluation(ctx) {
    switch (ctx.query.evaluation) {
      case 0:
        return {
          message: "反馈成功"
        }
      case 1:
        return {
          message: "反馈成功"
        }
      default:
        return {
          message: "反馈成功"
        }
        break;
    }
  }
  async getAnswer(ctx) {
    switch (ctx.query.question) {
      case '单支股票':
        return {
          message: testData.stock
        };
      case '股票列表':
        return {
          message: testData.stockList
        }
      case '讲个故事':
        return {
          message: testData.story
        }
      default:
        var result = await this.getNLP(ctx.query.question)
        return {
          message: {
            type: 'sentence',
            answer: result
          }
        }
    }
  }
  //corpus是要发送的对话
  getNLP(corpus) {
    var timestamp = new Date().getTime();
    var sign = MD5.md5(appSecret + "api=" + api + "appkey=" + appkey + "timestamp=" + timestamp + appSecret);
    var rqJson = {
      "data": {
        "input_type": 1,
        "text": corpus
      },
      "data_type": "stt"
    };
    var rq = JSON.stringify(rqJson);
    var cusid = Util.setCusid();
    var data = new Promise((resolve, reject) => {
      Util.httpRequest({
        url: NLPUrl,
        methods: 'get',
        data: {
          appkey: appkey,
          api: api,
          timestamp: timestamp,
          sign: sign,
          rq: rq,
          cusid: cusid,
        }
      }).then(data => {
        resolve(data.data.data.nli[0].desc_obj.result);
      }).catch(err => {
        reject(err)
      })
    })
    return data;
  }
}

module.exports = new chatController();
