import React from 'react'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { items, cartOpen, setCartOpen, updateQuantity, removeFromCart } = useCart()

  const total = items.reduce((sum, i) => sum + (i.piece.price ?? 0) * i.quantity, 0)

  if (!cartOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setCartOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 className="font-serif text-lg font-semibold text-stone-900">Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-stone-400 hover:text-stone-800 text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-stone-500 text-sm">Your cart is empty.</p>
          ) : (
            items.map(({ piece, quantity }) => (
              <div key={piece.id} className="flex gap-3 items-start">
                <img
                  src={`${import.meta.env.BASE_URL}${piece.image_url.replace(/^\//, '')}`}
                  alt={piece.title}
                  className="w-16 h-16 object-cover shrink-0 bg-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-stone-900 leading-tight">{piece.title}</div>
                  <div className="text-xs text-stone-400 mb-2">${piece.price}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(piece.id, -1)}
                      className="w-6 h-6 border border-stone-200 rounded text-sm flex items-center justify-center hover:bg-stone-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(piece.id, 1)}
                      disabled={piece.stock !== undefined && quantity >= piece.stock}
                      className="w-6 h-6 border border-stone-200 rounded text-sm flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(piece.id)}
                      className="ml-auto text-xs text-stone-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-stone-100 px-5 py-4">
            <div className="flex justify-between text-sm font-semibold text-stone-900 mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn-primary w-full">Checkout</button>
          </div>
        )}
      </div>
    </>
  )
}
