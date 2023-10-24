'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './mobile-menu'
import Logo from '../../../public/images/Zeta-Logo.png'

export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <>
      <header className={`fixed w-full z-30 md:bg-opacity-80 transition duration-300 ease-in-out ${!top ? 'bg-black backdrop-blur-sm shadow-lg' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link href="/" className="block" aria-label="Zeta">
                <Image className=" fill-current" src={Logo} alt={'200'} width={170} height={24} />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link href="#about" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="#compressor" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Compressor
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/signin" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href='/signup' className="font-medium bg-purple-600 hover:bg-purple-700 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>

            <MobileMenu />

          </div>
        </div>
      </header>

    </>
  )
}