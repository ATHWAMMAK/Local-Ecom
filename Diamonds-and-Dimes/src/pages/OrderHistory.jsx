import { useState } from 'react'
import { getUserByEmail, getOrdersByUserId } from '../services/api'
import { Link } from 'react-router-dom'

export default function OrderHistory() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function findOrders(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setOrders(null)

    try {
      const user = await getUserByEmail(email.trim())

       if (!user) {
      setOrders([])
      setMessage('No demo account was found for that email.')
      return
    }

    const userOrders = await getOrdersByUserId(user.id)
    setOrders(userOrders)

    if (userOrders.length === 0) {
      setMessage('No orders were found for this account.')
    }
  } catch {
    setMessage('Could not load orders. Check that the demo API is running and try again.')
  } finally {
    setLoading(false)
  }
  }
   return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-brand-black">
        Order History
      </h1>

      <form onSubmit={findOrders} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="history-email">
          Account email
        </label>

        <input
          id="history-email"
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
          className="min-h-12 rounded-md bg-brand-black px-6 text-white disabled:opacity-60"
        >
          {loading ? 'Looking up…' : 'Find orders'}
        </button>
      </form>
      {message && (
  <p role="status" className="mt-4 rounded-md bg-white p-4 text-brand-charcoal">
    {message}
  </p>
)}

{orders?.length > 0 && (
  <ul className="mt-6 space-y-4">
    {orders.map((order) => (
      <li
        key={order.id}
        className="rounded-md border border-brand-charcoal/10 bg-white p-5"
      >
        <h2 className="font-semibold text-brand-black">
          Order #{order.id}
        </h2>
        <p className="mt-2">Status: {order.status || 'Pending'}</p>
        <p className="mt-1">
          Total: KES {Number(order.total || 0).toLocaleString()}
        </p>
        <Link
          to={`/orders/${order.id}`}
          className="mt-3 inline-block font-medium underline decoration-brand-gold underline-offset-4"
        >
          View order
        </Link>
      </li>
    ))}
  </ul>
)}
  </section>
    
  )
}