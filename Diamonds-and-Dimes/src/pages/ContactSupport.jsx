import { useState } from 'react'

const initialForm = { name: '', email: '', orderNumber: '', topic: '', message: '' }
const topics = ['Order status', 'Shipping & delivery', 'Returns & exchanges', 'Setup & compatibility', 'Warranty & repairs', 'Something else']
const faqs = [
  ['Where is my order?', 'Use your tracking link or email us with your order number.'],
  ['Can you help me set up a device?', 'Yes. Tell us the product name and the device you are pairing it with.'],
  ['What if my device is not working?', 'Restart it and check the power and updates. If it still has a problem, send us the model and order number.'],
]

function validateForm(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  if (!form.topic) errors.topic = 'Choose a topic.'
  if (form.message.trim().length < 10) errors.message = 'Please enter at least 10 characters.'
  return errors
}

export default function ContactSupport() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submittedName, setSubmittedName] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setSubmittedName('')
      return
    }
    setSubmittedName(form.name.trim())
    setForm(initialForm)
  }

  const fieldClass = 'mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20'
  const labelClass = 'block text-sm font-medium text-gray-800'

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <h1 className="text-3xl font-semibold">Contact &amp; support</h1>
        <p className="mt-2 text-gray-600">Need help with an order or device? Send us a message.</p>
        <p className="mt-4 text-sm text-gray-700">
          Email support: <a className="font-medium text-emerald-800 underline" href="mailto:support@diamondsanddimes.com">support@diamondsanddimes.com</a>
        </p>

        <section className="mt-8" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="text-lg font-semibold">Send us a message</h2>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
            {submittedName && (
              <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950" role="status" aria-live="polite">
                <strong>Thanks, {submittedName}.</strong> This demo form is not connected to an inbox yet. Please email us directly.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="support-name">Name *</label>
                <input className={fieldClass} id="support-name" name="name" autoComplete="name" value={form.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'support-name-error' : undefined} />
                {errors.name && <p className="mt-1 text-xs text-red-700" id="support-name-error">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="support-email">Email *</label>
                <input className={fieldClass} id="support-email" name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'support-email-error' : undefined} />
                {errors.email && <p className="mt-1 text-xs text-red-700" id="support-email-error">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="support-order">Order number <span className="font-normal text-gray-500">(optional)</span></label>
                <input className={fieldClass} id="support-order" name="orderNumber" value={form.orderNumber} onChange={updateField} />
              </div>
              <div>
                <label className={labelClass} htmlFor="support-topic">Topic *</label>
                <select className={fieldClass} id="support-topic" name="topic" value={form.topic} onChange={updateField} aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? 'support-topic-error' : undefined}>
                  <option value="">Choose a topic</option>
                  {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
                {errors.topic && <p className="mt-1 text-xs text-red-700" id="support-topic-error">{errors.topic}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="support-message">Message *</label>
              <textarea className={fieldClass} id="support-message" name="message" rows="4" maxLength="1200" value={form.message} onChange={updateField} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'support-message-error' : undefined} />
              {errors.message && <p className="mt-1 text-xs text-red-700" id="support-message-error">{errors.message}</p>}
            </div>

            <button className="rounded bg-emerald-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2" type="submit">
              Send message
            </button>
          </form>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-7" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-lg font-semibold">FAQs</h2>
          <div className="mt-3 divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map(([question, answer]) => (
              <details className="py-3" key={question}>
                <summary className="cursor-pointer text-sm font-medium">{question}</summary>
                <p className="mt-2 text-sm leading-6 text-gray-600">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

