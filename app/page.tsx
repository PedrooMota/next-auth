'use client'

import Banner from '../components/pages/landingPage/banner'
import PageIllustration from '../components/page-illustration'
import Hero from '../components/pages/landingPage/hero'
import Features from '../components/pages/landingPage/features'
import Zigzag from '../components/pages/landingPage/zigzag'
import Header from '../components/pages/landingPage/header'
import Footer from '../components/pages/landingPage/footer'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

export default function Home() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return (

    <>
      <PageIllustration />
      <Header />
      <Hero />
      <Features />
      <Zigzag />
      <Footer />
      <Banner />
    </>
  )
}