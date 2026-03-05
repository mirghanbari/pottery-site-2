import React from 'react'
import { useSearchParams } from 'react-router-dom'
import pieces from '@/data/pieces'
import { useCart } from '@/context/CartContext'

const CATEGORY_LABELS: Record<string, string> = {
  art:     'Sculptural Art',
  bowl:    'Bowls',
  cup:     'Cups',
  set:     'Tableware Sets',
  process: 'Studio Process',
}

const CATEGORIES = ['art', 'bowl', 'cup', 'set', 'process']

export default function Gallery() {
  const { addToCart, items } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const active = searchParams.get('category')

  const setCategory = (cat: string | null) => {
    if (cat) setSearchParams({ category: cat })
    else setSearchParams({})
  }

  const visible = active ? pieces.filter(p => p.category === active) : pieces

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">Gallery</h1>
      <div className="flex gap-2 flex-wrap mb-8">
        <button onClick={() => setCategory(null)} className={active === null ? 'filter-pill-active' : 'filter-pill'}>
          All
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={active === cat ? 'filter-pill-active' : 'filter-pill'}>
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visible.map(piece => {
          const inCart = items.find(i => i.piece.id === piece.id)?.quantity ?? 0
          const outOfStock = piece.stock !== undefined && piece.stock <= 0
          const atMax = piece.stock !== undefined && inCart >= piece.stock
          const disabled = outOfStock || atMax

          return (
            <div key={piece.id} className="piece-card">
              <div className="piece-card-image">
                <img src={piece.image_url} alt={piece.title} loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-stone-900">{piece.title}</h3>
                <p className="text-sm text-stone-500 mt-0.5">{piece.description}</p>
                {piece.price != null && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-stone-900">${piece.price}</span>
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
  )
}
