import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="text-white font-serif text-lg font-semibold mb-2">Savi + Tuli</div>
          <p className="text-sm leading-relaxed">
            Handmade ceramics from our studio — functional pieces made to live with you.
          </p>
        </div>
        <div>
          <div className="text-white text-sm font-medium mb-3">Collections</div>
          <ul className="space-y-1 text-sm">
            <li>Sculptural Art</li>
            <li>Bowls</li>
            <li>Cups</li>
            <li>Tableware Sets</li>
          </ul>
        </div>
        <div>
          <div className="text-white text-sm font-medium mb-3">Studio</div>
          <ul className="space-y-1 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Workshops &amp; Commissions</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800">
        <div className="container mx-auto px-6 py-4 text-xs text-stone-600">
          © {new Date().getFullYear()} Savi + Tuli Pottery. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
