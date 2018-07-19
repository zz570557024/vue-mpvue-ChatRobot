export default {
  async getUserInfo() {
    let data = await new Promise((resolve, reject) => {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: resolve,
            fail: reject
          })
        }
      })
    })
    return data
  },
  async httpRequest(options = {}) {
    let data = await new Promise((resolve, reject) => {
      switch (options.type) {
        case 0:
          options.url = 'http://127.0.0.1:8000' + options.url.split('/liang')[1];
          break;
        default:
          break;
      }
      wx.request({
        url: options.url,
        data: Object.assign({}, options.data),
        method: options.methods || 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: resolve,
        fail: reject
      })
    })
    return data
  },
  async getScreenWidth() {
    let data = await new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: resolve,
        fail: reject
      })
    })
    return data;
  },
  async pageScrollTo(YAxis) {
    let data = await wx.createSelectorQuery().select('.chat_area').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom - 500
      })
    }).exec()
    return await data;
  },
  async navigatePageTo(url = '/') {
    await wx.navigateTo({
      url: url
    })
  },
  //滚动顶部
  async scrollTop() {
    // wx.pageScrollTo({
    //   scrollTop: 0
    // })
  },
  //打开文件
  async downloadFile(url) {
    await wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: res => {
            console.log('打开文档失败')
          }
        })
      }
    })
  },
  async showToast(text) {
    await wx.showToast({
      title: text,
      icon: 'success',
      duration: 2000
    })
  }
}
