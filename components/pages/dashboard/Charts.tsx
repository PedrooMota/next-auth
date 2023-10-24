import LineChart from "./LineChart";
import AreaChart from "./AreaChart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { URL_API } from '../../../utils/constants';


interface Logs {
  dates: string[],
  runtimes: number[]
}

interface UserCompressor {
  idCompressor: string
}

export default function GraficosDashboard( { idCompressor }: UserCompressor) {

  const { data: session } = useSession()

  const [daily, setDaily] = useState<Logs>()
  const [accumulated, setAccumulated] = useState<Logs>()

  // ----------------------------------------------------

  function formatarDataParaString(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses começam do zero
    const ano = String(data.getFullYear()).slice(-2);

    return `${dia}/${mes}/${ano}`
  }

  // ----------------------------------------------------

  function formatarStringParaMinutos(dados: string): number {
    const hora = Number(dados.substring(0, 2))
    const minutos = Number(dados.substring(3, 5))
    const total = (hora * 60) + (minutos)

    return total
  }

  // ----------------------------------------------------

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function analisarDados(dados: any[]): Logs {
    const arrayDatas: string[] = []
    const arrayRuntimes: number[] = []

    dados.map((item: any) => {
      const date = new Date(item.log_date)
      const runTime = item.total_runtime

      const newRuntime = formatarStringParaMinutos(runTime)
      arrayRuntimes.push(newRuntime)

      const newDate = formatarDataParaString(date)
      arrayDatas.push(newDate)
    })

    const result: Logs = {
      dates: arrayDatas,
      runtimes: arrayRuntimes
    }

    return result
  }

  useEffect(() => {
    
    const fetchData = async () => {
      
      try {
        const resp = await fetch(`${URL_API}/compressors/${idCompressor}/logs`, {
          next: {
            revalidate: 300,
          },
        })

        if (!resp.ok) {
          throw new Error('Failed to fetch data')
        }

        const resposta = await resp.json()

        let daily_runtime_accumulated = resposta.daily_runtime_accumulated
        daily_runtime_accumulated = analisarDados(daily_runtime_accumulated)

        // ----------------------------------------------

        let daily_runtimes = resposta.daily_runtime
        daily_runtimes = analisarDados(daily_runtimes)

        setDaily(daily_runtimes)
        setAccumulated(daily_runtime_accumulated)

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <section className="grid gap-20">
        <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
          <div className="max-w-xl md:max-w-none md:w-full mx-auto sm:col-span-2 md:col-span-6 lg:col-span-6 mb-10 bg-white shadow rounded-lg">
            <div className='md:pr-4 lg:pr-12 xl:pr-16'>
              <div className="px-6 py-5 font-semibold border-b border-gray-100">Tempo de operação acumulado</div>
              <div className="p-2 max-w-full mx-auto md:max-w-none h-auto">
                <AreaChart daily_runtime_accumulated={accumulated?.runtimes} log_date={accumulated?.dates} />
              </div>
            </div>
          </div>
          <div className="max-w-xl md:max-w-none md:w-full mx-auto sm:col-span-2 md:col-span-6 lg:col-span-6 mb-10 bg-white shadow rounded-lg">
            <div className='md:pr-4 lg:pr-12 xl:pr-16'>
              <div className="px-6 py-5 font-semibold border-b border-gray-100">Tempo de utilização por hora</div>
              <div className="p-2 max-w-full mx-auto md:max-w-none h-auto">
                <LineChart daily_runtime={daily?.runtimes} log_date={daily?.dates} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}