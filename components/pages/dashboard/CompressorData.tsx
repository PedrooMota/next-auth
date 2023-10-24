'use client'

import TableDashboard from "../../materialUi/Table"
import { URL_API } from '../../../utils/constants'; 
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface UserCompressor {
  idCompressor: number
}

export default function DadosCompressor({ idCompressor }:UserCompressor ) {


  const [nameCompressor, setNameCompressor] = useState('')
  const [serialCompressor, setSerialCompressor] = useState(0)
    

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch(`${URL_API}/compressors/${idCompressor}`, {
            next: {
              revalidate: 300,
            },
          })
          const resp = await res.json()

          const name = resp.data.name;
          const serial_number = resp.data.serial_number;
          
          setNameCompressor(name)
          setSerialCompressor(serial_number)
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [idCompressor]);

  
  return (
    <>
        <section className="grid gap-20">
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              <div className="max-w-xl md:max-w-none md:w-full mx-auto sm:col-span-2 md:col-span-6 lg:col-span-6 mb-10 bg-white shadow rounded-lg">
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className="px-6 py-5 font-semibold border-b border-gray-100">Dados do compressor</div>
                  <div className="p-2 max-w-full mx-auto md:max-w-none h-auto">
                    <TableDashboard name={nameCompressor} serial_number={serialCompressor} />
                  </div>
                </div>
              </div>
              <div className="max-w-xl md:max-w-none md:w-full mx-auto sm:col-span-2 md:col-span-6 lg:col-span-6 mb-10 bg-white shadow rounded-lg">
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className="px-6 py-5 font-semibold border-b border-gray-100">Dados do compressor</div>
                  <div className="p-2 max-w-full mx-auto md:max-w-none h-auto">
                    teste
                  </div>
                </div>
              </div>
            </div>
        </section>
    
    </>
  )
}


