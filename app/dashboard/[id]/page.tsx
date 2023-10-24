'use client'

import React,{ useEffect } from 'react'
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import Loading from '../../../components/loading';
import Header from "../../../components/header";
import Card from '../../../components/pages/dashboard/DashboardCard'
import DadosCompressor from "../../../components/pages/dashboard/CompressorData";
import Grafico from "../../../components/pages/dashboard/Charts";

import NProgress from 'nprogress'

export default function Dashboard({ params }: any) {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams])


  const { status } = useSession();
  const router = useRouter();

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

          {/* ========= */}
          <div className="flex-grow text-gray-800">
            <Header />
            <main className="p-6 sm:p-12 space-y-6 ">
                <Card 
                    idCompressor={params.id} 
                    key={params.id} 
                />
                <DadosCompressor 
                    idCompressor={params.id} 
                    key={params.id}  
                />
                <Grafico 
                    idCompressor={params.id} 
                    key={params.id} 
                />
            </main>
          </div>
        </section>
      </>
    )
  }
}
