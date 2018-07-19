import Util from "../utils/util";
const dateFrom = "2018-01-01";
const dateTo = Util.nowDate();

export default class Kline {
  getDailyDate(service, data = {}) {
    let option = {
      url: '/liang/stock/priceDaily',
      methods: 'GET',
      data: {
        code: data.code || '000002',
        type: '14901',
        adjusted: '',
        from: dateFrom,
        to: dateTo
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  getMouthDate(service, data = {}) {
    let option = {
      url: '/liang/stock/priceMonthly',
      methods: 'GET',
      data: {
        code: data.code || '000002',
        type: '14901',
        adjusted: '',
        from: dateFrom,
        to: dateTo
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  getWeekData(service, data = {}) {
    let option = {
      url: '/liang/stock/priceWeekly',
      methods: 'GET',
      data: {
        code: data.code || '000002',
        type: '14901',
        adjusted: '',
        from: dateFrom,
        to: dateTo
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  getTimeDate(service, data = {}) {
    let option = {
      url: '/liang/stock/timeShareDaily',
      methods: 'GET',
      data: {
        code: data.code || '000002',
        type: '14901',
        incr: '0',
        dt: '09:30:00'
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  getFiveData(service, data = {}) {
    let option = {
      url: '/liang/stock/timeShareWeek',
      methods: 'GET',
      data: {
        code: data.code || '000002',
        type: '14901',
        incr: '0',
        dt: ''
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  //股票实时信息
  stockRealTime(service, data = {}) {
    let option = {
      url: '/liang/stock/stockRealTime',
      methods: 'GET',
      data: {
        shrCd: data.code,
        typ: data.typ || '14901'
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  //个股相关新闻
  getStockNews(service, data = {}) {
    var option = {
      url: '/liang/stock/stockNews',
      methods: 'GET',
      data: {
        code: data.code,
        page: data.page || 1,
        count: data.count || 10
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  //个股相关公告
  getStockNotices(service, data = {}) {
    var option = {
      url: '/liang/stock/stockAnnouncement',
      methods: 'GET',
      data: {
        code: data.code,
        page: data.page || 1,
        count: data.count || 10
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  //个股相关研报
  getResearch(service, data = {}) {
    var option = {
      url: '/liang/stock/stockReport',
      methods: 'GET',
      data: {
        code: data.code,
        page: data.page || 1,
        count: data.count || 10
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  //个股简况
  getStockSummary(service, data = {}) {
    var option = {
      url: '/liang/stock/stockSummary',
      methods: 'GET',
      data: {
        code: data.code
      },
      type: 0
    }
    return service.httpRequest(option)
  }
  //个股资金流向
  getCapitalFlows(service, data = {}) {
    var option = {
      url: '/liang/stock/capitalFlows',
      methods: 'GET',
      type: 0
    }
    return service.httpRequest(option)
  }
  //个股资金五日流向
  getCapitalFlowsMain(service, data = {}) {
    var option = {
      url: '/liang/stock/capitalFlowsMain',
      methods: 'GET',
      type: 0
    }
    return service.httpRequest(option)
  }
}
