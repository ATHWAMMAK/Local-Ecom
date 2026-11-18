import { useState } from 'react'

export default function Contact() {
  const [submittedName, setSubmittedName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const savedMessages = JSON.parse(localStorage.getItem('dd-contact-messages') || '[]')
    savedMessages.push({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      createdAt: new Date().toISOString(),
    })
    localStorage.setItem('dd-contact-messages', JSON.stringify(savedMessages))
    setSubmittedName(formData.get('name'))
    event.currentTarget.reset()
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-brand-charcoal/60">We are here to help</p>
        <h1 className="mt-1 text-3xl font-bold">Contact us</h1>
        <p className="mt-4 leading-7 text-brand-charcoal/70">
          Ask us about a product, an order, or anything else we can help with.
        </p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold">
          Your name
          <input className="mt-1 block w-full rounded border border-black/20 bg-white px-3 py-2 font-normal outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30" name="name" required />
        </label>
        <label className="block text-sm font-semibold">
          Email address
          <input className="mt-1 block w-full rounded border border-black/20 bg-white px-3 py-2 font-normal outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30" name="email" required type="email" />
        </label>
        <label className="block text-sm font-semibold">
          Message
          <textarea className="mt-1 block w-full rounded border border-black/20 bg-white px-3 py-2 font-normal outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30" name="message" required rows="5" />
        </label>
        <button className="rounded bg-brand-black px-5 py-3 font-semibold text-brand-ivory hover:bg-brand-charcoal" type="submit">
          Send message
        </button>
        {submittedName && (
          <p className="text-sm" role="status">
            Thanks, {submittedName}. Your message was saved in this browser.
          </p>
        )}
      </form>
    </section>
  )
}
