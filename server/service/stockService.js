const testData = require('../testData/stock')

class stockController {
  stockRealTime() {
    return testData.stockRealTime;
  }
  priceMonthly() {
    return testData.priceMonthly;
  }
  priceWeekly() {
    return testData.priceWeekly;
  }
  priceDaily() {
    return testData.priceDaily;
  }
  timeShareWeek() {
    return testData.timeShareWeek;
  }
  stockNews() {
    return testData.stockNews;
  }
  stockAnnouncement() {
    return testData.stockAnnouncement;
  }
  stockReport() {
    return testData.stockReport;
  }
  stockSummary() {
    return testData.stockSummary;
  }
  capitalFlowsMain() {
    return testData.capitalFlowsMain;
  }
  capitalFlows() {
    return testData.capitalFlows;
  }
}

module.exports = new stockController();
