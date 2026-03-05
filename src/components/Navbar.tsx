import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { totalItems, setCartOpen } = useCart()

  const linkClass = (path: string) =>
    `px-3 py-2 text-sm transition-colors ${
      pathname === path ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
    }`

  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="font-serif text-xl font-bold tracking-tight text-stone-900">
          Savi + Tuli
        </button>
        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1">
            <button className={linkClass('/')}        onClick={() => navigate('/')}>Home</button>
            <button className={linkClass('/gallery')} onClick={() => navigate('/gallery')}>Gallery</button>
            <button className={linkClass('/about')}   onClick={() => navigate('/about')}>About</button>
            <button className={linkClass('/contact')} onClick={() => navigate('/contact')}>Contact</button>
            <button className={linkClass('/admin')}   onClick={() => navigate('/admin')}>Admin</button>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative ml-4 p-2 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-stone-900 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
