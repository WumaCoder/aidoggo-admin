const echarts = require("echarts/lib/echarts");

export function createTimeLine({ newUser, activeUser, totalUser }) {
  return {
    backgroundColor: "#fff",
    title: {
      text: "访问流量",
      textStyle: {
        fontSize: 12,
        fontWeight: 400
      },
      left: "center",
      top: "5%"
    },
    legend: {
      icon: "circle",
      top: "5%",
      right: "5%",
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        color: "#556677"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        label: {
          show: true,
          backgroundColor: "#fff",
          color: "#556677",
          borderColor: "rgba(0,0,0,0)",
          shadowColor: "rgba(0,0,0,0)",
          shadowOffsetY: 0
        },
        lineStyle: {
          width: 0
        }
      },
      backgroundColor: "#fff",
      textStyle: {
        color: "#5c6c7c"
      },
      padding: [10, 10],
      extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)"
    },
    grid: {
      top: "15%"
    },
    xAxis: [
      {
        type: "time",
        // data: [
        //   "2019/11/1",
        //   "2019/11/2",
        //   "2019/11/3",
        //   "2019/11/7",
        //   "2019/11/8",
        //   "2019/11/9"
        // ],
        axisLine: {
          lineStyle: {
            color: "#DCE2E8"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#556677"
          },
          // 默认x轴字体大小
          fontSize: 12,
          // margin:文字到x轴的距离
          margin: 15
        },
        axisPointer: {
          label: {
            padding: [0, 0, 10, 0],
            margin: 15,
            fontSize: 12,
            backgroundColor: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#fff" // 0% 处的颜色
                },
                {
                  offset: 0.86,
                  color: "#fff" // 0% 处的颜色
                },
                {
                  offset: 0.86,
                  color: "#33c0cd" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#33c0cd" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#DCE2E8"
          }
        },
        axisLabel: {
          textStyle: {
            color: "#556677"
          }
        },
        splitLine: {
          show: false
        }
      },
      {
        type: "value",
        position: "right",
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#556677"
          },
          formatter: "{value}"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#DCE2E8"
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: "新增用户",
        type: "line",
        data: newUser,
        symbolSize: 1,
        yAxisIndex: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#68e4bc"
            },
            {
              offset: 1,
              color: "#4ad0d1"
            }
          ])
        },
        itemStyle: {
          normal: {
            color: "#68e4bc",
            borderColor: "#4ad0d1"
          }
        }
      },
      {
        name: "活跃用户",
        type: "line",
        data: activeUser,
        symbolSize: 1,
        yAxisIndex: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#fcac94"
            },
            {
              offset: 1,
              color: "#f3a183"
            }
          ])
        },
        itemStyle: {
          normal: {
            color: "#fcac94",
            borderColor: "#f3a183"
          }
        }
      },
      {
        name: "现存用户",
        type: "line",
        data: totalUser,
        symbolSize: 1,
        yAxisIndex: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#f073c8"
            },
            {
              offset: 1,
              color: "#ff6a95"
            }
          ])
        },
        itemStyle: {
          normal: {
            color: "#f073c8",
            borderColor: "#ff6a95"
          }
        }
      }
    ]
  };
}
