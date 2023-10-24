'use client'

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';

import { URL_API } from '../../../utils/constants'; 
import { ToastContainer, toast } from 'react-toastify';

export default function CreateCompressor () {

    const { data: session } = useSession();
    const Origin = process.env.NEXT_PUBLIC_AWS_ORIGIN;
    const region = process.env.NEXT_PUBLIC_AWS_REGION ?? '';

    const [dados, setDados] = useState({
        name: '',
        model: '',
        serial: '',
      });

      const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setDados({
          ...dados,
          [name]: value,
        });
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        fetchData()
      };


    const fetchData = async () => {
        try {
            const res = await fetch(`${URL_API}/compressors/client/b0ab7e28-de89-4629-91b8-2950ff5df706`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application-json',
                    "region": region ?? '',
                    "origin": Origin ?? '',
                },
            
                body: JSON.stringify({
                    name: dados.name,
                    id_clientl: session?.user.id,
                    id_model: dados.model,
                    serial_number: dados.serial,
                }),

                next: {
                revalidate: 300,
                },
            })

            if (res.status === 200)[
                toast.success('Compressor criado com sucesso!')
            ]

            if (res.status === 489){
                toast.info('Compressor já existe.')
            }

            if (res.status === 404){
                toast.error('Não foi possível criar o compressor. Tente novamente mais tarde!')
            }

        } catch (error) {
            console.error(error);
        }
    };
      
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Crie outro dashboard
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-blue-600 m-0 text-[17px] font-medium">
                Criar compressor
                </Dialog.Title>
                <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-normal">
                Make changes to your profile here. Click save when youre done.
                </Dialog.Description>
                <form onSubmit={handleSubmit}>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-black w-[90px] text-right text-[15px]" htmlFor="name">
                        Nome do compressor
                    </label>
                    <input
                        className="text-black shadow-black focus:shadow-black inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="name" value={dados.name} onChange={handleInputChange}
                    />
                    </fieldset>

                    <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-black w-[90px] text-right text-[15px]" htmlFor="id-model">
                            Número do modelo
                    </label>
                    <input
                        className="text-black shadow-black focus:shadow-black inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="id-model" value={dados.model} onChange={handleInputChange}
                    />
                    </fieldset>

                    <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-black w-[90px] text-right text-[15px]" htmlFor="id-model">
                            Número de serial
                    </label>
                    <input
                        className="text-black shadow-black focus:shadow-black inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="serial-number" value={dados.serial} onChange={handleInputChange}
                    />
                    </fieldset>
                
                    <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                        <button className="bg-blue-600 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                        Salvar novo compressor
                        </button>
                    </Dialog.Close>
                    </div>
                </form>
                <Dialog.Close asChild>
                <button
                    className="text-red-700 hover:bg-red-500 focus:shadow-red-600 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                >
                    <Cross2Icon />
                </button>
                </Dialog.Close>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
