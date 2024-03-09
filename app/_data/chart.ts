export const chartBackgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(234,147,31,0.2)",
  "rgba(123,123,123,0.2)",
  "rgba(152, 251, 152, 0.2)",
  "rgba(187,201,254, 0.2)",
  "rgba(235,31,32, 0.2)",
]

export const chartBorderColors = chartBackgroundColors.map((v) => v.replace("0.2)", "1)"))

export const rankingOptions = {
  indexAxis: "y" as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        min: 0,
        precision: 0,
        beginAtZero: true,
        callback: function (value: number) {
          return value + "vote"
        },
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}
