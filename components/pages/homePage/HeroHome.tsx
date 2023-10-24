import { useSession } from 'next-auth/react';


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CreateCompressor from './DialogCompressor';

export default function HeroDashboard() {

    const { data: session } = useSession()

    return (
        <>
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                    <h1 className="text-4xl font-semibold mb-2">Bem vindo, Dr(a) {session?.user.name || <Skeleton count={2} />} <br /> ao Dashboard</h1>
                    <h2 className="text-gray-600 ml-0.5">Entre no dashboard do seu compressor</h2>
                </div>
                <div className="flex flex-wrap items-start justify-end -mb-3">
                    <CreateCompressor />
                </div>
            </div>
        </>
    )
}