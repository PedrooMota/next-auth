'use client'

import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";

interface Props {
  log_date: string[] | undefined,
  daily_runtime_accumulated: number[] | undefined
}

const AreaChart = ({ log_date, daily_runtime_accumulated }: Props) => {

  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'area',
    },
    xAxis: {
      categories: log_date,
      title: {
        text: 'Dias da semana'
      },
    },
    yAxis: {
      min: 0,
      max: 125,
      title: {
        text: 'Tempo'
      }
    },
    title: {
      text: 'Tempo de operação acumulado (em minutos)'
    },
    series: [
      { 
        name: "Motor Elétrico",
        data: daily_runtime_accumulated
      }
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e: any){
              setHoverData(e.target.category)
            }
          }
        }
      }
    }
  });

  

  return (
      <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6'>
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
        <h3 className='text-center'>Dia da semana: {hoverData}</h3>
      </div>
    )
}
export default AreaChart;