import dayjs from 'dayjs';

const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
const labelFont = 'bold 12px Sans-serif';
export default {
  methods: {
    parseKData: function (array) {
      var item = []
      var results = []
      for (var i = 0; i < array.length; i++) {
        item.push(array[i].dt)
        item.push(array[i].open * 100)
        item.push(array[i].close * 100)
        item.push(array[i].low * 100)
        item.push(array[i].high * 100)
        item.push(array[i].vol * 100)
        results.push(item)
        item = []
      }
      return results
    },
    splitData: function (rawData) {
      var categoryData = [];
      var values = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },
    setOption: function (data0, params) {
      console.log('data0', data0)
      var upColor = '#ec0000';
      var upBorderColor = '#8A0000';
      var downColor = '#00da3c';
      var downBorderColor = '#008F28';

      function calculateMA(data0, dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }

      function getVolumes(data0) {
        let data = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
          data.push(data0.values[i][4])
        }
        return data
      }

      function getOpen(data0) {
        let data = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
          data.push(data0.values[i][0])
        }
        return data
      }

      function getArrMin(arr) {
        let min = arr[0][3];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][3] < min) {
            min = arr[i][3]
          }
        }
        return min
      }
      var option = {
        title: {
          //   text: params.shrNm + '(' + params.shrCd + ')',
          x: 'center',
          top: '-15',
          textStyle: {
            fontSize: '14',
          },
          subtext: params.shrNm + '(' + params.shrCd + ')' + ' ' + '分析周期：' + params.from + '至' + params.to
        },
        animation: true,
        color: colorList,
        axisPointer: {
          link: [{
            xAxisIndex: [0, 1]
          }]
        },
        xAxis: [{
          name: '后续走势',
          nameLocation: 'center',
          type: 'category',
          data: data0.categoryData,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#777'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            formatter: function (value) {
              return dayjs(value).format('YY-M-D');
            }
          },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            show: true
          }
        }, {
          type: 'category',
          gridIndex: 1,
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#777'
            }
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        }],
        yAxis: [{
          scale: true,
          splitNumber: 2,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            inside: true,
            formatter: '{value}\n'
          },
          min: 'dataMin',
          max: 'dataMax'
        }, {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          min: 'dataMin',
          max: 'dataMax'
        }],
        grid: [{
          left: 20,
          right: 20,
          top: 10,
          height: 120
        }, {
          left: 20,
          right: 20,
          height: 40,
          top: 160
        }],
        graphic: [{
          type: 'group',
          left: 'center',
          top: 70,
          width: 200,
          bounding: 'raw',
          children: [{
            id: 'MA5',
            type: 'text',
            style: {
              fill: colorList[1],
              font: labelFont
            },
            left: 0
          }, {
            id: 'MA10',
            type: 'text',
            style: {
              fill: colorList[2],
              font: labelFont
            },
            left: 'center'
          }, {
            id: 'MA20',
            type: 'text',
            style: {
              fill: colorList[3],
              font: labelFont
            },
            right: 0
          }]
        }],
        series: [{
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList;
                if (getVolumes(data0)[params.dataIndex - 1] > getVolumes(data0)[params.dataIndex]) {
                  colorList = '#14b143';
                } else {
                  colorList = '#ef232a';
                }
                return colorList;
              }
            },
            emphasis: {
              color: '#140'
            }
          },
          data: getVolumes(data0)
        }, {
          type: 'candlestick',
          name: '日K',
          data: data0.values,
          itemStyle: {
            normal: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143'
            },
            emphasis: {
              color: 'black',
              color0: '#444',
              borderColor: 'black',
              borderColor0: '#444'
            }
          }
        }, {
          data: [
            [data0.categoryData[data0.values.length - 21], getArrMin(data0.values) - getArrMin(data0.values) / 50],
            [data0.categoryData[data0.values.length - 21], data0.values[data0.values.length - 21][3]]
          ],
          type: 'line',
          lineStyle: {
            normal: {
              width: 1,
              type: 'dashed'
            }
          }
        }]
      };
      return option
    }
  }
}
