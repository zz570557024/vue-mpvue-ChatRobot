const axios = require('axios');

class Util {
  //ajax请求
  async httpRequest(option = {}) {
    if (option.methods == 'GET' || option.methods == 'get') {
      return await axios.get(
        option.url, {
          params: option.data
        }
      )
    } else if (option.methods == 'POST' || option.methods == 'post') {
      return await axios.post(
        option.url, option.data, {
          headers: option.headers
        }
      )
    } else {
      console.log('method not allow!')
    }
  }
  setCusid() {
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var cusidLength = 30,
      cusid = '';
    for (var i = 0; i < cusidLength; i++) {
      var oneStr = str.charAt(Math.floor(Math.random() * str.length));
      cusid += oneStr;
    }
    return cusid;
  }
}

module.exports = new Util();
