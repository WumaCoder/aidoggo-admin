var colorList = [
  {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(51,192,205,0.01)" // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(51,192,205,0.57)" // 100% 处的颜色
      }
    ],
    globalCoord: false // 缺省为 false
  },
  {
    type: "linear",
    x: 1,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(115,172,255,0.02)" // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(115,172,255,0.67)" // 100% 处的颜色
      }
    ],
    globalCoord: false // 缺省为 false
  }
];
var colorLine = ["#33C0CD", "#73ACFF"];

function getRich() {
  const result = {};
  colorLine.forEach((v, i) => {
    result[`hr${i}`] = {
      backgroundColor: colorLine[i],
      borderRadius: 3,
      width: 3,
      height: 3,
      padding: [3, 3, 0, -12]
    };
    result[`a${i}`] = {
      padding: [8, -60, -20, -20],
      color: colorLine[i],
      fontSize: 12
    };
  });
  return result;
}
const data = [
  {
    name: "男",
    value: 2
  },
  {
    name: "女",
    value: 5
  }
].sort((a, b) => {
  return b.value - a.value;
});
data.forEach((v, i) => {
  v.labelLine = {
    lineStyle: {
      width: 1,
      color: colorLine[i]
    }
  };
});
const option = {
  series: [
    {
      type: "pie",
      radius: "60%",
      center: ["50%", "50%"],
      clockwise: true,
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: "outside",
        formatter: function(params) {
          const name = params.name;
          const percent = params.percent + "%";
          const index = params.dataIndex;
          return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join(
            "\n"
          );
        },
        rich: getRich()
      },
      itemStyle: {
        normal: {
          color: function(params) {
            return colorList[params.dataIndex];
          }
        }
      },
      data,
      roseType: "radius"
    }
  ]
};

export default option;
