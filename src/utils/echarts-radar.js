export default {
  setOptions() {
    var option = {
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [{
            name: '上涨',
            max: 100
          },
          {
            name: '牛人',
            max: 100
          },
          {
            name: '价值',
            max: 100
          },
          {
            name: '走势',
            max: 100
          },
          {
            name: '主力',
            max: 100
          },
          {
            name: '热度',
            max: 100
          }
        ]
      },
      series: [{
        name: '综合评分',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [{
          value: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
          name: '预算分配（Allocated Budget）'
        }]
      }]
    };
    return option
  }
}
