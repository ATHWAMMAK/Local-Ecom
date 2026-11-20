import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getUserByEmail,
  getOrdersByUserId,
} from '../services/api'

const formatKES = (amount) =>
  `KSh ${Number(amount || 0).toLocaleString('en-KE')}`

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
      const user = await getUserByEmail(email.trim().toLowerCase())

      if (!user) {
        setOrders([])
        setMessage('No demo account was found for that email.')
        return
      }

      const userOrders = await getOrdersByUserId(user.id)

      const sortedOrders = [...userOrders].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )

      setOrders(sortedOrders)

      if (sortedOrders.length === 0) {
        setMessage('No orders were found for this account.')
      }
    } catch {
      setMessage(
        'Could not load orders. Check that the demo API is running and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-8">
      <header className="water-surface overflow-hidden rounded-3xl px-6 py-12 shadow-xl sm:px-10 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
          Diamonds and Dimes
        </p>

        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Your Shopping Journey.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
          Every purchase tells a story. Find your previous orders and revisit
          the details of your favourite finds.
        </p>
      </header>

      <div className="rounded-3xl border border-brand-aqua/20 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-aqua/15 text-xl text-brand-deep-aqua">
            ◇
          </span>

          <div>
            <h2 className="font-display text-2xl text-brand-black">
              Find Your Orders
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the email address used during checkout.
            </p>
          </div>
        </div>

        <form
          onSubmit={findOrders}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="history-email">
            Account email
          </label>

          <input
            id="history-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your demo account email"
            autoComplete="email"
            className="min-h-12 flex-1 rounded-xl border border-gray-200 bg-brand-ivory px-4 text-brand-black outline-none transition placeholder:text-gray-400 focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="min-h-12 rounded-full bg-brand-black px-8 font-bold text-brand-aqua transition hover:bg-brand-deep-aqua hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Find My Orders →'}
          </button>
        </form>

        <p className="mt-3 text-xs leading-5 text-gray-400">
          This demonstration uses the email associated with your mock customer
          account. It is not a secure authentication system.
        </p>
      </div>

      {loading && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div
            role="status"
            aria-label="Loading orders"
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand-aqua/20 border-t-brand-deep-aqua"
          />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Looking for your orders...
          </p>
        </div>
      )}

      {!loading && message && (
        <div
          role="status"
          className="rounded-2xl border border-brand-aqua/20 bg-white p-6 text-center shadow-sm"
        >
          <span className="text-3xl text-brand-deep-aqua" aria-hidden="true">
            ◇
          </span>
          <p className="mt-3 text-sm leading-6 text-gray-600">{message}</p>

          {orders?.length === 0 && (
            <Link
              to="/shop"
              className="mt-5 inline-flex rounded-full bg-brand-black px-6 py-3 font-bold text-brand-aqua transition hover:bg-brand-deep-aqua hover:text-white"
            >
              Explore the Shop
            </Link>
          )}
        </div>
      )}

      {!loading && orders?.length > 0 && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep-aqua">
                Your purchases
              </p>
              <h2 className="mt-1 font-display text-2xl text-brand-black">
                Order History
              </h2>
            </div>

            <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm font-bold text-brand-black">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {orders.map((order) => {
              const itemCount = Array.isArray(order.items)
                ? order.items.reduce(
                    (total, item) => total + Number(item.quantity || 0),
                    0
                  )
                : 0

              const date = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Date unavailable'

              return (
                <article
                  key={order.id}
                  className="rounded-3xl border border-brand-aqua/20 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                        Order reference
                      </p>
                      <h3 className="mt-1 font-display text-xl text-brand-black">
                        #{order.id}
                      </h3>
                    </div>

                    <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-bold capitalize text-brand-black">
                      {order.status || 'Pending'}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 border-y border-gray-100 py-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-gray-400">Date placed</p>
                      <p className="mt-1 text-sm font-semibold text-brand-black">
                        {date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Items ordered</p>
                      <p className="mt-1 text-sm font-semibold text-brand-black">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Order total</p>
                      <p className="mt-1 text-lg font-bold text-brand-deep-aqua">
                        {formatKES(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                      Thank you for shopping with us.
                    </p>

                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-brand-aqua transition hover:bg-brand-deep-aqua hover:text-white"
                    >
                      View Order →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5 text-center">
        <p className="font-display text-lg text-brand-black">
          Luxury in Every Choice.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Thank you for being part of Diamonds and Dimes.
        </p>
      </div>
    </section>
  )
}
