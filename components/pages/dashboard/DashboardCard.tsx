'use client'

import React, { useState } from 'react';
import { URL_API } from '../../../utils/constants'; 
import { useEffect } from 'react'
import { useSession } from 'next-auth/react';

interface UserCompressor {
    idCompressor: string
  }

export default function CardDashboard ({ idCompressor }: UserCompressor) {

    const { data: session } = useSession()
    const [worked, setWorked] = useState()
    const [eletrical, setEletrical] = useState()

    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const resp = await fetch (`${URL_API}/compressors/${idCompressor}/logs`, {
                next: {
                    revalidate: 300,
                },
            })
    
            if (!resp.ok) {
                throw new Error('Failed to fetch data')
            }
            
            const resposta = await resp.json()
            const eletricalSwitching  = resposta.hour_electrical_switching_count
            const workedHours = resposta.total_runtime

            setWorked(workedHours)
            setEletrical(eletricalSwitching)
        
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [session, idCompressor]);

    return (
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">{worked} horas</span>
                    <span className="block text-gray-500">Tempo energizado e em uso</span>
                </div>
            </div>
            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">2 horas</span>
                    <span className="block text-gray-500">Tempo ligado em utilização</span>
                </div>
            </div>
            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <span className="inline-block text-2xl font-bold">{eletrical} chaveamentos</span>
                    <span className="block text-gray-500">Chavemento elétrico</span>
                </div>
            </div>
            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">100 horas</span>
                    <span className="block text-gray-500">Tempo desligado e em repouso</span>
                </div>
            </div>
        </section>
    )
}
