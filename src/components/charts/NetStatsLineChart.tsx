import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import unitFunctions from '../../function/getUnitFunctions'

import { netStats } from '../../types/chartDataType'

import { unixTimeArrayToYMDHMS } from '../../function/unixTimeFormatter'
import { isDecimal } from '../../function/utils'

type ApexGeneric = ApexOptions & any

type chartData = [
  {
    name: string
    data: Array<number>
  },
]

export default function NetStatsLineChart(props: {
  partialnetstatsarray: Array<Partial<netStats>>
  displaydata: string
}) {
  // console.log(props.partialnetstatsarray)
  // minutelyNetStatsからaddressCountを取り出した配列を生成する
  const valueArray: Array<number> = props.partialnetstatsarray.map(
    (netStats) => {
      return Number(netStats[props.displaydata])
    },
  )

  const convertedValueArray = unitFunctions[props.displaydata](valueArray)

  let chartData: chartData = [
    {
      name: props.displaydata,
      data: convertedValueArray.data,
    },
  ]

  let chartOptions: ApexGeneric = {
    chart: {
      toolbar: {
        show: false,
      },
      type: 'line',
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
    },
    xaxis: {
      categories: unixTimeArrayToYMDHMS(
        props.partialnetstatsarray.map((netStats) => netStats.endTimeUnix),
      ),
      tickAmount: 5,
      trim: true,
      show: false,
      labels: {
        maxWidth: 200,
        maxHeight: 100,
        show: true,
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
        rotateAlways: true,
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
          if (isDecimal(Number(val))) {
            return val + ` ${convertedValueArray.unit}`
          } else {
            return Number(val).toFixed(2) + ` ${convertedValueArray.unit}`
          }
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
  }

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="line"
      width="100%"
      height="100%"
    />
  )
}
