import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './mobile-menu'
import Logo from '../public/images/Zeta-Logo.png'
import DialogAlert from './radix/alertDialog'

export default function Header() {

  return (
    <header className='bg-black backdrop-blur-sm shadow-lg w-full z-30 transition duration-300 ease-in-out'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Zeta">
              <Image className="fill-current" src={Logo} alt={'200'} width={170} height={24} />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link href="/home"className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#controle" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Controle
                </Link>
              </li>
              <li>
                <Link href="#manutencao" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Manutenção
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Perfil
                </Link>
              </li>
              <li>
                <DialogAlert />
              </li>
            </ul>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}