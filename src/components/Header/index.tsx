import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FPTLogo from '@/assets/fpt-logo.png'

const headerNav = [
  { path: '/', label: 'Home' },
  { path: '/movies/latest', label: 'Movies' }
]

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed flex-items-center justify-between py-4 px-8 w-full ${isScrolled ? 'bg-black-primary' : 'bg-gradient-to-r from-black-secondary via-transparent to-transparent'} transition duration-300 ease-in-out top-0 z-50`}
    >
      <div className='flex-items-center'>
        <NavLink to='/'>
          <img src={FPTLogo} alt='Logo' className='h-10 mr-10 cursor-pointer' />
        </NavLink>
        <nav className='ml-auto'>
          <ul className='flex space-x-4'>
            {headerNav.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? 'font-bold text-white-primary' : 'font-thin text-white-secondary'} text-xl text-white-secondary hover:text-white-hover`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
