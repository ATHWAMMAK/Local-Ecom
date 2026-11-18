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
    <p className="mt-3">Name: {name || 'Not provided'}</p>
    <p className="mt-1">Email: {user.email}</p>
    <p className="mt-1">Phone: {phone || 'Not provided'}</p>
  </div>
)}
</section>

   )
}
