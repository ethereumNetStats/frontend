import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import * as getNormalizedUnit from '../../function/getNormalizedUnit'
import type { blockDataWithNewAddressCountAndTps, latestBlockData } from '../../types/chartDataType'
import { unixTimeArrayToHMS } from '../../function/unixTimeFormatter'

type ApexGeneric = ApexOptions & any

type chartData = [
  {
    name: string
    data: Array<number>
  },
]

export default function NewGasUsedBarChart(props: {
  latestData: latestBlockData
}) {
  // latestDataからtimestampとtpsを取り出した配列を生成する
  const gasUsedArray: Array<number> = props.latestData.map((blockData: blockDataWithNewAddressCountAndTps) => {
    return blockData.gasUsed
  })

  let chartData: chartData = [
    {
      name: '',
      data: getNormalizedUnit.ofWeiArray(gasUsedArray, 0)
        .data,
    },
  ]

  let chartOptions: ApexGeneric = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
      },
      theme: 'dark',
      // x: {
      //   formatter: function (x: number) {
      //     if (typeof x !== 'undefined') {
      //       return props.arrayOfBlockData.reverse()[
      //         transactionCountArray
      //           .reverse()
      //           .findIndex((transactionCount) => transactionCount === x)
      //       ].number
      //     }
      //   },
      // },
    },
    xaxis: {
      categories: unixTimeArrayToHMS(
        props.latestData.map((block) => block.timestamp),
      ),
      show: false,
      labels: {
        show: true,
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: 'black',
      labels: {
        show: true,
        style: {
          colors: '#CBD5E0',
          fontSize: '14px',
        },
        formatter: function (val: string, index: any) {
          return (
            val +
            ` ${
              getNormalizedUnit.ofWeiArray(gasUsedArray, 0)
                .unit
            }`
          )
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: '#4318FF',
              opacity: 1,
            },
            {
              offset: 100,
              color: 'rgba(67, 24, 255, 1)',
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '40px',
      },
    },
  }

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  )
}
