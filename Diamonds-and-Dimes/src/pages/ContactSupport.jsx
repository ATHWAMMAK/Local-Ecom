import { useState } from 'react'
import { createContactMessage } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  orderNumber: '',
  topic: '',
  message: '',
}

const topics = [
  'Order status',
  'Shipping & delivery',
  'Returns & exchanges',
  'Setup & compatibility',
  'Warranty & repairs',
  'Something else',
]

const faqs = [
  [
    'Where is my order?',
    'Use your order history to review your order details, or contact us with your order number for assistance.',
  ],
  [
    'Can you help me set up a device?',
    'Absolutely. Tell us the product name and the device you are pairing it with so we can guide you.',
  ],
  [
    'What if my device is not working?',
    'Try restarting it and checking its power connection and available updates. If the problem continues, send us the model and order number.',
  ],
  [
    'How can I ask about a return?',
    'Select Returns & exchanges in the contact form and include your order number and a description of the issue.',
  ],
]

function validateForm(form) {
  const errors = {}

  if (!form.name.trim()) errors.name = 'Please enter your name.'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.topic) errors.topic = 'Please choose a support topic.'

  if (form.message.trim().length < 10) {
    errors.message = 'Please enter at least 10 characters.'
  }

  return errors
}

export default function ContactSupport() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submittedName, setSubmittedName] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(event) {
    const { name, value } = event.target

    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmissionError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateForm(form)

    setErrors(nextErrors)
    setSubmissionError('')
    setSubmittedName('')

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    try {
      await createContactMessage({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        orderNumber: form.orderNumber.trim(),
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      })

      setSubmittedName(form.name.trim())
      setForm(initialForm)
      setErrors({})
    } catch (error) {
      setSubmissionError(
        'We could not submit your message. Please check your connection and try again.'
      )
      console.error('Contact form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass =
    'mt-2 min-h-12 w-full rounded-xl border border-brand-charcoal/15 bg-brand-ivory/60 px-4 py-3 text-sm text-brand-black outline-none transition placeholder:text-brand-charcoal/40 focus:border-brand-deep-aqua focus:ring-2 focus:ring-brand-aqua/25'

  const labelClass =
    'block text-sm font-semibold text-brand-black'

  const errorClass = 'mt-1.5 text-xs font-medium text-red-700'

  return (
    <section className="mx-auto w-full max-w-6xl space-y-10">
      <div className="water-surface relative overflow-hidden rounded-3xl px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex rounded-full border border-brand-aqua/50 bg-brand-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-aqua">
            We're here to help
          </span>

          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Let's Make Things Right.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Questions about an order, a product or your shopping experience?
            Reach out. We'd love to hear from you.
          </p>
        </div>

        <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full border border-brand-aqua/30 sm:h-72 sm:w-72" />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl bg-brand-black p-7 text-white shadow-lg sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-aqua">
              Customer care
            </span>

            <h2 className="mt-4 font-display text-2xl">
              We're only a message away.
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/70">
              Tell us what's happening and provide as much helpful detail as
              possible. Our support team can retrieve submitted messages from
              the support system.
            </p>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Email support
              </p>

              <a
                href="mailto:support@diamondsanddimes.com"
                className="mt-2 inline-block break-all text-sm font-medium text-brand-aqua underline decoration-brand-aqua/40 underline-offset-4 transition hover:text-white"
              >
                support@diamondsanddimes.com
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-gold/30 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-aqua/15 text-2xl text-brand-deep-aqua">
              ◇
            </div>

            <h3 className="mt-4 font-display text-xl text-brand-black">
              A little detail goes a long way.
            </h3>

            <p className="mt-2 text-sm leading-7 text-brand-charcoal/70">
              Including your order number and product details helps make your
              support request easier to understand.
            </p>
          </div>
        </aside>

        <div className="rounded-3xl border border-brand-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep-aqua">
              Get in touch
            </p>

            <h2 className="mt-2 font-display text-2xl text-brand-black">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-brand-charcoal/65">
              Fields marked with * are required.
            </p>
          </div>

          {submittedName && (
            <div
              className="mt-6 rounded-2xl border border-brand-deep-aqua/25 bg-brand-deep-aqua/10 p-4 text-sm leading-6 text-brand-deep-aqua"
              role="status"
              aria-live="polite"
            >
              <strong>Thank you, {submittedName}!</strong>
              <p className="mt-1">
                Your message was successfully submitted. Our team can retrieve
                it from the support system.
              </p>
            </div>
          )}

          {submissionError && (
            <p
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
              role="alert"
            >
              {submissionError}
            </p>
          )}

          <form
            className="mt-7 space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="support-name">
                  Name *
                </label>

                <input
                  className={fieldClass}
                  id="support-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your full name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'support-name-error' : undefined}
                />

                {errors.name && (
                  <p className={errorClass} id="support-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="support-email">
                  Email address *
                </label>

                <input
                  className={fieldClass}
                  id="support-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'support-email-error' : undefined}
                />

                {errors.email && (
                  <p className={errorClass} id="support-email-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="support-order">
                  Order number{' '}
                  <span className="font-normal text-brand-charcoal/50">
                    (optional)
                  </span>
                </label>

                <input
                  className={fieldClass}
                  id="support-order"
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={updateField}
                  placeholder="e.g. 1001"
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="support-topic">
                  Support topic *
                </label>

                <select
                  className={fieldClass}
                  id="support-topic"
                  name="topic"
                  value={form.topic}
                  onChange={updateField}
                  required
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={errors.topic ? 'support-topic-error' : undefined}
                >
                  <option value="">Choose a topic</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>

                {errors.topic && (
                  <p className={errorClass} id="support-topic-error">
                    {errors.topic}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label className={labelClass} htmlFor="support-message">
                  Your message *
                </label>

                <span className="text-xs text-brand-charcoal/50">
                  {form.message.length}/1200
                </span>
              </div>

              <textarea
                className={`${fieldClass} min-h-36 resize-y`}
                id="support-message"
                name="message"
                rows="5"
                maxLength={1200}
                value={form.message}
                onChange={updateField}
                placeholder="How can we help you?"
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'support-message-error' : undefined}
              />

              {errors.message && (
                <p className={errorClass} id="support-message-error">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              className="min-h-12 w-full rounded-xl bg-brand-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending your message...' : 'Send message'}
            </button>

            <p className="text-xs leading-5 text-brand-charcoal/50">
              This coursework demo stores support messages in its connected
              demo API. It does not send an email automatically.
            </p>
          </form>
        </div>
      </div>

      <section
        className="rounded-3xl border border-brand-charcoal/10 bg-white p-6 shadow-sm sm:p-8"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep-aqua">
            Helpful answers
          </p>

          <h2
            id="faq-heading"
            className="mt-2 font-display text-2xl text-brand-black"
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-sm leading-6 text-brand-charcoal/65">
            A few quick answers to help you get started.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {faqs.map(([question, answer]) => (
            <details
              className="group rounded-2xl border border-brand-charcoal/10 bg-brand-ivory/50 p-5 transition open:border-brand-aqua/50 open:bg-white"
              key={question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-brand-black marker:hidden">
                {question}

                <span className="shrink-0 text-xl font-normal text-brand-deep-aqua transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 border-t border-brand-charcoal/10 pt-4 text-sm leading-7 text-brand-charcoal/70">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </section>
  )
}
