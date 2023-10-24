'use client'

import React from "react";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../../components/loading';
import HeaderExp from '../../components/pages/landingPage/headerExp';

import { useEffect } from 'react'
import NProgress from 'nprogress'

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  // =========================================== 

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

    toast.success('Logado com sucesso!')
    router.push('/home', { scroll: false });
  }

  // --------------------------------------

  if (status === 'authenticated') {
    router.push('/home')
  }

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <div>
          <HeaderExp />
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
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <div className="flex justify-between">
                          <Link href="#" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Esqueceu sua senha?</Link>
                        </div>
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
                  <div className="text-gray-400 text-center mt-6">
                    Você não tem uma conta? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </section>
        </div>
      </>
    );
  }
}
