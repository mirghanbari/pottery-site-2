import React, { createContext, useContext, useState } from 'react'
import type { Piece } from '@/data/pieces'

export type CartItem = { piece: Piece; quantity: number }

type CartContextType = {
  items: CartItem[]
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (piece: Piece) => void
  updateQuantity: (id: string, delta: number) => void
  removeFromCart: (id: string) => void
  totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (piece: Piece) => {
    setItems(prev => {
      const existing = prev.find(i => i.piece.id === piece.id)
      if (existing) {
        if (piece.stock !== undefined && existing.quantity >= piece.stock) return prev
        return prev.map(i => i.piece.id === piece.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      if (piece.stock !== undefined && piece.stock <= 0) return prev
      return [...prev, { piece, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev.flatMap(i => {
        if (i.piece.id !== id) return [i]
        const q = i.quantity + delta
        if (q <= 0) return []
        if (delta > 0 && i.piece.stock !== undefined && q > i.piece.stock) return [i]
        return [{ ...i, quantity: q }]
      })
    )
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.piece.id !== id))
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, cartOpen, setCartOpen, addToCart, updateQuantity, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
