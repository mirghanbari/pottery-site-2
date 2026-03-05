import React, { useState, useEffect } from 'react'
import type { Piece } from '@/data/pieces'

const CATEGORIES: Piece['category'][] = ['art', 'bowl', 'cup', 'set', 'process']

const blankPiece = (): Piece => ({
  id: '',
  title: '',
  description: '',
  image_url: '',
  category: 'art',
  price: undefined,
  stock: undefined,
})

type PieceFormProps = {
  form: Piece
  onChange: (f: Piece) => void
  onSave: () => void
  onCancel: () => void
  saveLabel: string
}

function PieceForm({ form, onChange, onSave, onCancel, saveLabel }: PieceFormProps) {
  const input = 'border border-gray-300 rounded px-2 py-1 text-sm w-full'
  const textFields: { key: keyof Piece; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'image_url', label: 'Image URL' },
  ]

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {textFields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{label}</label>
            <input
              className={input}
              value={form[key] as string ?? ''}
              onChange={e => onChange({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Category</label>
          <select
            className={input}
            value={form.category}
            onChange={e => onChange({ ...form, category: e.target.value as Piece['category'] })}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Price ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={`${input} text-base font-semibold`}
            value={form.price ?? ''}
            placeholder="No price"
            onChange={e => onChange({ ...form, price: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Stock (qty)</label>
          <input
            type="number"
            min="0"
            step="1"
            className={`${input} text-base font-semibold`}
            value={form.stock ?? ''}
            placeholder="Unlimited"
            onChange={e => onChange({ ...form, stock: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-700"
        >
          {saveLabel}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-1.5 border text-sm rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function Admin() {
  const [pieces, setPieces] = useState<Piece[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Piece>(blankPiece())
  const [addForm, setAddForm] = useState<Piece>(blankPiece())
  const [showAdd, setShowAdd] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  useEffect(() => {
    fetch('/api/pieces')
      .then(r => r.json())
      .then(data => {
        setPieces(data)
        setLoading(false)
      })
      .catch(() => {
        setMsg({ text: 'Could not load pieces — is the dev server running?', error: true })
        setLoading(false)
      })
  }, [])

  const flash = (text: string, error = false) => {
    setMsg({ text, error })
    setTimeout(() => setMsg(null), 3000)
  }

  const saveAll = async (updated: Piece[]) => {
    const res = await fetch('/api/pieces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    if (res.ok) {
      setPieces(updated)
      flash('Saved to pieces.ts')
    } else {
      flash('Error saving', true)
    }
  }

  const startEdit = (p: Piece) => {
    setEditing(p.id)
    setEditForm({ ...p })
    setShowAdd(false)
  }

  const saveEdit = async () => {
    await saveAll(pieces.map(p => (p.id === editing ? editForm : p)))
    setEditing(null)
  }

  const deletePiece = (id: string) => {
    const piece = pieces.find(p => p.id === id)
    if (!piece) return
    if (!confirm(`Delete "${piece.title}"?`)) return
    saveAll(pieces.filter(p => p.id !== id))
  }

  const addPiece = async () => {
    if (!addForm.id.trim() || !addForm.title.trim()) {
      flash('ID and Title are required', true)
      return
    }
    if (pieces.some(p => p.id === addForm.id)) {
      flash(`ID "${addForm.id}" already exists`, true)
      return
    }
    await saveAll([...pieces, addForm])
    setAddForm(blankPiece())
    setShowAdd(false)
  }

  return (
    <section className="container mx-auto px-6 py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin — Pieces</h1>
        {msg && (
          <span className={`text-sm ${msg.error ? 'text-red-600' : 'text-green-600'}`}>
            {msg.text}
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <>
          <div className="space-y-2 mb-6">
            {pieces.length === 0 && (
              <p className="text-gray-500 text-sm">No pieces yet. Add one below.</p>
            )}
            {pieces.map(p => (
              <div key={p.id}>
                {editing === p.id ? (
                  <PieceForm
                    form={editForm}
                    onChange={setEditForm}
                    onSave={saveEdit}
                    onCancel={() => setEditing(null)}
                    saveLabel="Save"
                  />
                ) : (
                  <div className="flex items-start justify-between p-3 border rounded hover:bg-gray-50">
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gray-400">{p.id}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded">{p.category}</span>
                      </div>
                      <div className="font-medium mb-1">{p.title}</div>
                      <div className="flex items-center gap-4 mb-1">
                        <span className="text-base font-semibold text-gray-900">
                          {p.price != null ? `$${p.price}` : <span className="text-gray-400 font-normal text-sm">No price</span>}
                        </span>
                        <span className={`text-sm font-medium ${p.stock === undefined ? 'text-gray-400' : p.stock <= 0 ? 'text-red-500' : 'text-gray-600'}`}>
                          {p.stock === undefined ? 'Unlimited stock' : p.stock <= 0 ? 'Out of stock' : `${p.stock} in stock`}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{p.description}</div>
                      <div className="text-xs text-gray-400 truncate">{p.image_url}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(p)}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePiece(p.id)}
                        className="px-3 py-1 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAdd ? (
            <PieceForm
              form={addForm}
              onChange={setAddForm}
              onSave={addPiece}
              onCancel={() => {
                setShowAdd(false)
                setAddForm(blankPiece())
              }}
              saveLabel="Add Piece"
            />
          ) : (
            <button
              onClick={() => {
                setShowAdd(true)
                setEditing(null)
              }}
              className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-gray-400 hover:text-gray-700 text-sm"
            >
              + Add Piece
            </button>
          )}
        </>
      )}
    </section>
  )
}
