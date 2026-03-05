import React from 'react'

export default function Contact() {
  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="mb-4 text-gray-700">Interested in a piece or a workshop? Send a message.</p>
      <form className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
        </div>
        <div>
          <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        </div>
      </form>
    </section>
  )
}
