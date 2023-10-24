import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";

interface Props {
  log_date: string[] | undefined,
  daily_runtime: number[] | undefined
}

const LineChart = ( { log_date, daily_runtime }: Props) => {

  // console.log(log_date)
  // console.log(daily_runtime)

  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line',
      dropShadow: {
        enable: true,
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.6
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#0088ff', '#ff0000'],
    dataLabels: {
      enabled: true
    },

    stroke: {
      curve: 'smooth'
    },

    grid: {
      borderColor: '#ff0000',
      row: {
        colors: ['#c5d2d3', 'transparent'],
        opacity: 0.5
      }
    },

    series: [
      {
        name: "Motor Elétrico",
        data: daily_runtime
      },
      {
        name: 'Máx Recomendável - 2023',
        data: daily_runtime?.map(() => {return 10})
      }
    ],
    markers: {
      size: 1
    },
    xAxis: {
      categories: log_date,
      title: {
        text: 'Minutos por dia'
      }
    },
    yAxis: {
      min: 0,
      max: 30,
      title: {
        text: 'Minutos trabalhados'
      }
    },
    title: {
      text: 'Tempo de Operação Diária (em minutos)',
      align: 'center'
    },
    plotOptions: {
      line: {
        dataLabels: {
            enabled: true
        },
      },
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
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
        <h3 className='text-center'>Dia da semana: {hoverData}</h3>
      </div>
    )
}
export default LineChart;