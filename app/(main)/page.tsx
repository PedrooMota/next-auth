

'use client'

import React from "react";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
 
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const loginUser = async (e: any) => {
    e.preventDefault();
    signIn('credentials', {
      ...data,
      redirect: false,
    });
    
      router.push('/dashboard', { scroll: false });
  }

  // --------------------------------------
    return (
      <>
        <div>
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 shadowrounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20 p-6 sm:p-8 lg:p-16 space-y-8">
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-8 md:pb-16">
                  <h1 className="h2 text-gray-100 mt-10">Bem vindo de volta! Efetue seu Login abaixo.</h1>
                </div>
                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form onSubmit={loginUser} className='space-y-6'>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full px-3">

                        <label className=" text-sm font-medium text-gray-300 block" htmlFor="email">Email</label>
                        <input name='email' id="email" type="text" onChange={(e) => {
                          setData({ ...data, email: e.target.value })
                        }} className="form-input w-full text-gray-300" placeholder="you@gmail.com" required />

                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Senha</label>
                        <input name='password' id="password" type="password" onChange={(e) => {
                          setData({ ...data, password: e.target.value })
                        }} className="form-input w-full text-gray-300" placeholder="Senha (pelo menos 10 caracteres)" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button
                          type='submit'
                          className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
}
