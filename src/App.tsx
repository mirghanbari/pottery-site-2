import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import Home from '@/pages/Home'
import Gallery from '@/pages/Gallery'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Admin from '@/pages/Admin'
import { CartProvider } from '@/context/CartContext'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"        element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about"   element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin"   element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
