import React from 'react'
import { useNavigate } from 'react-router-dom'
import pieces from '@/data/pieces'
import { useCart } from '@/context/CartContext'

const COLLECTIONS = [
  { key: 'art',  label: 'Sculptural Art',  image: '/assets/pottery/art-01.jpg' },
  { key: 'bowl', label: 'Bowls',           image: '/assets/pottery/bowl-01.jpg' },
  { key: 'cup',  label: 'Cups',            image: '/assets/pottery/cup-01.jpg' },
  { key: 'set',  label: 'Tableware Sets',  image: '/assets/pottery/set-01.jpg' },
]

const FEATURED_IDS = ['bowl-01', 'cup-01', 'set-01']

export default function Home() {
  const navigate = useNavigate()
  const { addToCart, items } = useCart()
  const featured = FEATURED_IDS.map(id => pieces.find(p => p.id === id)).filter(Boolean) as typeof pieces
  const collectionCounts = COLLECTIONS.map(c => ({
    ...c,
    count: pieces.filter(p => p.category === c.key).length,
  }))

  return (
    <>
      {/* Hero */}
      <section className="bg-stone-50">
        <div className="container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]">
          <div className="flex-1 max-w-lg">
            <p className="eyebrow">Handmade in studio</p>
            <h1 className="mt-4 mb-6 leading-tight">
              Ceramics<br />made to last
            </h1>
            <p className="text-stone-500 text-lg mb-10 leading-relaxed">
              Functional and sculptural pottery hand-thrown in stoneware and porcelain.
              Each piece is unique and made with intention.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="btn-primary" onClick={() => navigate('/gallery')}>Browse Gallery</button>
              <button className="btn-outline" onClick={() => navigate('/about')}>Our Story</button>
            </div>
          </div>
          <div className="flex-1 w-full lg:h-[70vh] rounded-xl overflow-hidden shadow-xl bg-stone-200">
            <img
              src="/assets/pottery/art-01.jpg"
              alt="Featured pottery piece"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Shop</p>
            <h2 className="section-title">Our Collections</h2>
          </div>
          <button onClick={() => navigate('/gallery')} className="text-sm text-stone-500 hover:text-stone-900 transition-colors hidden sm:block">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {collectionCounts.map(c => (
            <button key={c.key} onClick={() => navigate(`/gallery?category=${c.key}`)} className="group text-left">
              <div className="relative overflow-hidden rounded-xl aspect-square bg-stone-200 mb-3">
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="font-semibold text-sm">{c.label}</div>
                  <div className="text-xs text-white/70">{c.count} pieces</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Pieces */}
      <section className="bg-stone-50 py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <p className="eyebrow mb-2">Highlights</p>
            <h2 className="section-title">Featured Pieces</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featured.map(piece => {
              const inCart = items.find(i => i.piece.id === piece.id)?.quantity ?? 0
              const outOfStock = piece.stock !== undefined && piece.stock <= 0
              const atMax = piece.stock !== undefined && inCart >= piece.stock
              const disabled = outOfStock || atMax

              return (
                <div key={piece.id} className="piece-card">
                  <div className="piece-card-image">
                    <img src={piece.image_url} alt={piece.title} loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-stone-900">{piece.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{piece.description}</p>
                    {piece.price != null && (
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-stone-900">${piece.price}</span>
                        <button
                          onClick={() => !disabled && addToCart(piece)}
                          disabled={disabled}
                          className={disabled ? 'btn-disabled' : 'btn-sm-primary'}
                        >
                          {outOfStock ? 'Out of Stock' : atMax ? 'Max in Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
