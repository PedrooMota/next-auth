'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import React, { useEffect, useState, Suspense } from 'react'
import { useSession } from "next-auth/react";

import Loading from '../../components/loading';
import Header from "../../components/header";
import Hero from "../../components/pages/homePage/HeroHome";
import Card from '../../components/pages/homePage/CompressorCard'
import { URL_API } from '../../utils/constants'; 

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

interface Compressor {
  id: number,
  name: string,
  id_model: string, 
  serial_number: number
}

export default function Home() {

  const { data: session, status } = useSession()
  const router = useRouter();

  const pathname = usePathname()
  const searchParams = useSearchParams()

  // --------------------------------------

  useEffect(() => {
      NProgress.done();
      return () => {
      NProgress.start();
      };
  }, [pathname, searchParams])

  const [checked, setChecked] = React.useState(false); 
  
  const handleChange = () => { 
    setChecked(!checked); 
  }; 

  const [compressores, setCompressores] = useState<Compressor[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch(`${URL_API}/compressors/client/${session?.user.id}`, {
            next: {
              revalidate: 300,
            },
          })
          const resp = await res.json()

          const compressores: Compressor[] = resp.data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              id_model: item.id_model,
              serial_number: item.serial_number
            }
          })
          setCompressores(compressores)

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [session?.user.id]);


// ---------------------------------------

  if (status === 'unauthenticated') {
    router.push('/signin', { scroll: false })
  }

  // ---------------------------------------

  if (status === 'loading') {
    return <Loading />
  }

// ---------------------------------------

  if (status === 'authenticated') {

    return (
      <>
        <section className="flex bg-gray-100">
            <div className="flex-grow text-gray-800">
              <Header />
              <main className="p-6 sm:p-8 space-y-6 ">
                <Hero />
                <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {
                      compressores?.map((item: Compressor) => (
                        <div className="flex items-center p-8 bg-white shadow rounded-lg" key={item.id}>
                            <Card 
                              id={item.id} 
                              name={item.name} 
                              id_model={item.id_model} 
                              serial_number={item.serial_number}
                              key={item.id}  />
              
                        </div>
                      ))
                    }
                  </section>
                <div> 
                  <label> 
                    <input 
                      type="checkbox"
                      checked={checked} 
                      onChange={handleChange} 
                    /> 
                    Loading 
                  </label> 
                  <p>{checked?<Skeleton />:  
                  <h2> 
                  NextJs Skeleton Loading - GeeksforGeeks 
                  </h2>}</p> 
                </div> 
              </main>
            </div>
        </section>

       
      </>
    )
  }
}
