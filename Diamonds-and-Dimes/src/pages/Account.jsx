import { useState } from 'react'
import { getUserByEmail, updateUser } from '../services/api'

export default function Account() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notice, setNotice] = useState('')
  const [noticeType, setNoticeType] = useState('info')
  const [loading, setLoading] = useState(false)

  async function findAccount(event) {
    event.preventDefault()
    setLoading(true)
    setNotice('')
    setUser(null)

    try {
      const found = await getUserByEmail(email.trim())

      if (!found) {
        setNoticeType('error')
        setNotice('No demo account was found for that email.')
        return
      }

      setUser(found)
      setName(found.name || '')
      setPhone(found.phone || '')
      setNoticeType('success')
      setNotice('Your demo profile has been found.')
    } catch {
      setNoticeType('error')
      setNotice(
        'Could not load the account. Check that the demo API is running and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function saveProfile(event) {
    event.preventDefault()
    if (!user) return

    setLoading(true)
    setNotice('')

    try {
      const updatedUser = await updateUser(user.id, {
        name: name.trim(),
        phone: phone.trim(),
      })

      setUser(updatedUser)
      setName(updatedUser.name || '')
      setPhone(updatedUser.phone || '')
      setNoticeType('success')
      setNotice('Your demo profile has been saved successfully.')
    } catch {
      setNoticeType('error')
      setNotice(
        'Could not save the profile. Check that the demo API is running and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const noticeStyles = {
    success: 'border-brand-deep-aqua/30 bg-brand-deep-aqua/10 text-brand-deep-aqua',
    error: 'border-red-300 bg-red-50 text-red-700',
    info: 'border-brand-gold/40 bg-brand-gold/10 text-brand-charcoal',
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8">
      <div className="water-surface relative overflow-hidden rounded-3xl px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex rounded-full border border-brand-aqua/50 bg-brand-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-aqua">
            Your personal space
          </span>

          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Welcome to Your Account.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Keep your profile details up to date and enjoy a smoother
            Diamonds and Dimes shopping experience.
          </p>
        </div>

        <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full border border-brand-aqua/30 sm:h-72 sm:w-72" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="h-fit rounded-3xl border border-brand-gold/25 bg-brand-black p-7 text-white shadow-lg sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-aqua/40 bg-brand-aqua/10 text-2xl text-brand-aqua">
            ◇
          </div>

          <h2 className="mt-6 font-display text-2xl">
            Your details, your way.
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/70">
            Find your existing demo profile using the email address
            associated with your account.
          </p>

          <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-sm font-semibold text-brand-aqua">
                Profile management
              </p>
              <p className="mt-1 text-sm text-white/65">
                Update your name and contact number.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-brand-gold">
                A quick reminder
              </p>
              <p className="mt-1 text-sm leading-6 text-white/65">
                This is a coursework demo profile lookup, not secure
                authentication. Please use fictional details when testing.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-3xl border border-brand-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep-aqua">
                Account lookup
              </p>
              <h2 className="mt-2 font-display text-2xl text-brand-black">
                Find your profile
              </h2>
              <p className="mt-2 text-sm leading-6 text-brand-charcoal/70">
                Enter the email address used when creating your demo account.
              </p>
            </div>

            <form onSubmit={findAccount} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="account-email"
                  className="mb-2 block text-sm font-semibold text-brand-black"
                >
                  Email address
                </label>
                <input
                  id="account-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="min-h-12 w-full rounded-xl border border-brand-charcoal/20 bg-brand-ivory/60 px-4 text-brand-black outline-none transition focus:border-brand-deep-aqua focus:ring-2 focus:ring-brand-aqua/25"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="min-h-12 w-full rounded-xl bg-brand-black px-6 font-semibold text-white transition hover:bg-brand-deep-aqua disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Searching...' : 'Find my account'}
              </button>
            </form>
          </div>

          {notice && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-xl border p-4 text-sm leading-6 ${noticeStyles[noticeType]}`}
            >
              {notice}
            </p>
          )}

          {user && (
            <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4 border-b border-brand-charcoal/10 pb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-aqua/15 text-2xl font-bold text-brand-deep-aqua">
                  {(name || user.email || 'D').charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-deep-aqua">
                    Profile found
                  </p>
                  <h2 className="mt-1 truncate font-display text-xl text-brand-black">
                    {name || 'Your profile'}
                  </h2>
                  <p className="truncate text-sm text-brand-charcoal/60">
                    {user.email}
                  </p>
                </div>
              </div>

              <form onSubmit={saveProfile} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="account-name"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Full name
                  </label>
                  <input
                    id="account-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="min-h-12 w-full rounded-xl border border-brand-charcoal/20 px-4 text-brand-black outline-none transition focus:border-brand-deep-aqua focus:ring-2 focus:ring-brand-aqua/25"
                  />
                </div>

                <div>
                  <label
                    htmlFor="account-email-display"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Email address
                  </label>
                  <input
                    id="account-email-display"
                    type="email"
                    value={user.email || ''}
                    readOnly
                    className="min-h-12 w-full cursor-not-allowed rounded-xl border border-brand-charcoal/10 bg-brand-ivory px-4 text-brand-charcoal/60"
                  />
                  <p className="mt-2 text-xs text-brand-charcoal/50">
                    Your email address is displayed as a read-only field.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="account-phone"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Phone number
                  </label>
                  <input
                    id="account-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Enter your phone number"
                    className="min-h-12 w-full rounded-xl border border-brand-charcoal/20 px-4 text-brand-black outline-none transition focus:border-brand-deep-aqua focus:ring-2 focus:ring-brand-aqua/25"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="min-h-12 w-full rounded-xl bg-brand-deep-aqua px-6 font-semibold text-white transition hover:bg-brand-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? 'Saving changes...' : 'Save profile changes'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
