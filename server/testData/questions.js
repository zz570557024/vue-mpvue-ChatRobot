const qustions = {
  list: ['股票列表', '单支股票', '今天星期几', '你好', '讲个故事']
}

const stock = {
  answer: [{
    name: '万科',
    price: '23.46',
    code: '000002',
    inc: '-0.69',
    inc_value: '-2.86'
  }],
  type: 'label'
}

const date = {
  type: 'sentence',
  answer: new Date()
}

const stockList = {
  type: 'form',
  answer: [{
    name: '万科',
    price: '23.46',
    code: '000002',
    inc: '-0.69',
    inc_value: '-2.86',
    indication_value: ['3.25%']
  }, {
    name: '工商银行',
    price: '5.48',
    code: '601398',
    inc: '-0.72',
    inc_value: '-0.04',
    indication_value: ['0.06%']
  }, {
    name: '中国石油',
    price: '7.59',
    code: '601857',
    inc: '-2.19',
    inc_value: '-0.17',
    indication_value: ['0.01%']
  }, {
    name: '农业银行',
    price: '3.46',
    code: '601288',
    inc: '-1.14',
    inc_value: '-0.04',
    indication_value: ['0.07%']
  }, {
    name: '贵州茅台',
    price: '719.58',
    code: '600519',
    inc: '-0.85',
    inc_value: '-6.18',
    indication_value: ['0.19%']
  }],
  indication_name: ['换手率'],
  block_name: ['一线龙头']
}

const hello = {
  type: 'sentence',
  answer: '你好，我是Vuvi!'
}

const story = {
  type: 'sentence',
  answer: '1000多年以前，有两位僧人从远方来到赵州，向赵州禅师请教如何是禅。赵州禅师问其中的一个，“你以前来过吗？”那个人回答：“没有来过。”赵州禅师说：“吃茶去！” 赵州禅师转向另一个僧人，问：“你来过吗？”这个僧人说：“我曾经来过。”赵州禅师说：“吃茶去！”这时，引领那两个僧人到赵州禅师身边来的监院就好奇地问：“禅师，怎么来过的你让他吃茶去，未曾来过的你也让他吃茶去呢？” 赵州禅师称呼了监院的名字，监院答应了一声，赵州禅师说：“吃茶去！” '
}

const other = {
  type: 'sentence',
  answer: '开发中。。。'
}

module.exports = {
  qustions: qustions,
  stock: stock,
  date: date,
  stockList: stockList,
  hello: hello,
  story: story,
  other: other
};
