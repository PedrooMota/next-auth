
import React from 'react';
import Link from 'next/link';

interface Props {
    id: number,
    name: string,
    id_model: string, 
    serial_number: number
  }

export default function CardCompressores ({ id, name, id_model, serial_number }: Props) {

    return (
        <>
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <div>
                <span className="block text-2xl font-bold"><Link href={`/dashboard/${id}`}>Dashboard: {name}</Link></span>
                <span className="block text-gray-500">Serial do dashboard: {serial_number}</span>
            </div>
        </>
    )
}
