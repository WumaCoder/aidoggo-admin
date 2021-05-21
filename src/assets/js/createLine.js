export function createLine(data = []) {
  return {
    xAxis: {
      type: "category",
      show: false
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data,
        type: "line",
        smooth: true,
        show: false,
        symbol: "none",
        animationDuration: 1000,
        itemStyle: {
          normal: {
            lineStyle: {
              color: "#ffffff"
            }
          }
        }
      }
    ]
  };
}
