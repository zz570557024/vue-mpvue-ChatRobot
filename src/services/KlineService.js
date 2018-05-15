import Util from "../utils/util";
const dateFrom = "2012-01-01";
const dateTo = Util.nowDate();

export default class Kline {
  getDailyDate(service, data = {}) {
    console.log('code', data)
    let option = {
      url: '/api/stockInformationAPI/priceDaily',
      methods: 'POST',
      data: {
        code: data.code || '000002',
        type: '14901',
        adjusted: '',
        from: dateFrom,
        to: dateTo
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  getMouthDate(service, data = {}) {
    let option = {
      url: '/api/stockInformationAPI/priceMonthly',
      methods: 'POST',
      data: {
        code: data.code || '000002',
        type: '14901',
        adjusted: '',
        from: dateFrom,
        to: dateTo
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  getWeekData(service, data = {}) {
    let option = {
      url: '/api/stockInformationAPI/priceWeekly',
      methods: 'POST',
      data: {
        code: data.code || '000002',
        type: '14901',
        adjusted: '',
        from: dateFrom,
        to: dateTo
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  getTimeDate(service, data = {}) {
    let option = {
      url: '/api/stockInformationAPI/timeShareDaily',
      methods: 'POST',
      data: {
        code: data.code || '000002',
        type: '14901',
        incr: '0',
        dt: '09:30:00'
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  getFiveData(service, data = {}) {
    let option = {
      url: '/api/stockInformationAPI/timeShareWeek',
      methods: 'POST',
      data: {
        code: data.code || '000002',
        type: '14901',
        incr: '0',
        dt: ''
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  //股票实时信息
  stockRealTime(service, data = {}) {
    let option = {
      url: '/api/v3.0/external/stockRealTime',
      methods: 'GET',
      data: {
        shrCd: data.code,
        typ: data.typ || '14901'
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  //股票涨跌幅排行榜
  stockRatioRanking(service, data = {}) {
    var option = {
      url: '/api/stockInformationAPI/stockRatioRanking',
      methods: 'POST',
      data: {
        type: data.type,
        sort: data.sort,
        limit: data.size || 10
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  //个股相关新闻
  getStockNews(service, data = {}) {
    var option = {
      url: '/api/stockInformationAPI/stockNews',
      methods: 'POST',
      data: {
        code: data.code,
        page: data.page || 1,
        count: data.count || 10
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  //个股相关公告
  getStockNotices(service, data = {}) {
    var option = {
      url: '/api/stockInformationAPI/stockAnnouncement',
      methods: 'POST',
      data: {
        code: data.code,
        page: data.page || 1,
        count: data.count || 10
      },
      type: 1
    }
    return service.httpRequest(option)
  }
  //个股相关研报
  getResearch(service, data = {}) {
    var option = {
      url: '/api/stockInformationAPI/stockReport',
      methods: 'POST',
      data: {
        code: data.code,
        page: data.page || 1,
        count: data.count || 10
      },
      type: 1
    }
    return service.httpRequest(option)
  }
}
