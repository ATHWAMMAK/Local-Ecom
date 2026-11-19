import { useState } from 'react'
import { getUserByEmail, updateUser } from '../services/api';

export default function Account() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

 async function findAccount(event) {
  event.preventDefault()
  setLoading(true)
  setNotice('')
  setUser(null)

  try {
    const found = await getUserByEmail(email.trim())

    if (!found) {
      setNotice('No demo account was found for that email.')
      return
    }

    setUser(found)
    setName(found.name || '')
    setPhone(found.phone || '')
  } catch {
    setNotice('Could not load the account. Check that the demo API is running and try again.')
  } finally {
    setLoading(false)
  }
 }

 async function saveProfile(event) {
  event.preventDefault()
  if(!user) return

  setLoading(true)
  setNotice('')

  try {
    const updatedUser = await updateUser(user.id, {
      name: name.trim(),
      phone: phone.trim(),
    })
    setUser(updatedUser)
    setNotice('Demo profile saved')
     } catch {
      setNotice('Could not save the profile. Check that the demo API is running and try again.')
    } finally {
      setLoading(false)
    }
  }


 return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold text-brand-black">
          My Account
        </h1>


      <p className="mt-3 text-brand-charcoal">
         Enter the email for your demo account to look up your profile.
      </p>

      <form onSubmit={findAccount} className="mt-8 flex flex-col gap-3 sm:flex-row">
  <label className="sr-only" htmlFor="account-email">
    Account email
  </label>


  <input
    id="account-email"
    type="email"
    required
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    placeholder="Email on your demo account"
    className="min-h-12 flex-1 rounded-md border border-brand-charcoal/25 bg-white px-4"
  />

  <button
    type="submit"
    disabled={loading}
    className="min-h-12 rounded-md bg-brand-black px-6 font-medium text-white disabled:opacity-60"
  >
    {loading ? 'Loading…' : 'Find account'}
  </button>
</form>
{notice && (
  <p role="status" className="mt-4 rounded-md bg-white p-4 text-brand-charcoal">
    {notice}
  </p>
)}

{user && (
  <div className="mt-6 rounded-md bg-white p-5 text-brand-charcoal">
    <h2 className="text-xl font-semibold text-brand-black">
      Account found
    </h2>
    <form onSubmit={saveProfile} className="mt-4 space-y-4">
      <div>
        <label htmlFor="account-name" className="mb-1 block">
          Name
        </label>
        <input
          id="account-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="min-h-11 w-full rounded-md border border-brand-charcoal/25 px-3"
        />
      </div>

      <div>
        <label htmlFor="account-email-display" className="mb-1 block">
          Email
        </label>
        <input
          id="account-email-display"
          value={user.email}
          readOnly
          className="min-h-11 w-full rounded-md border border-brand-charcoal/15 bg-brand-ivory px-3"
        />
      </div>

      <div>
        <label htmlFor="account-phone" className="mb-1 block">
          Phone
        </label>
        <input
          id="account-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="min-h-11 w-full rounded-md border border-brand-charcoal/25 px-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="min-h-11 rounded-md bg-brand-black px-5 font-medium text-white disabled:opacity-60"
      >
        {loading ? 'Saving…' : 'Save profile'}
      </button>
    </form>
  </div>
)}
</section>

   )
}
