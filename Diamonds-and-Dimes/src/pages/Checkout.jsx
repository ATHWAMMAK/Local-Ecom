import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import {
  getUserByEmail,
  createUser,
  createOrder,
} from '../services/api'
import { getProductImageUrl } from '../utils/productImage'

const formatKES = (amount) =>
  `KSh ${Number(amount || 0).toLocaleString('en-KE')}`

const inputClass =
  'min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-brand-black outline-none transition placeholder:text-gray-400 focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/20'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useShop()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (cart.length === 0 || loading) return

    setLoading(true)
    setError('')

    try {
      const email = form.email.trim().toLowerCase()

      let user = await getUserByEmail(email)

      if (!user) {
        user = await createUser({
          name: form.name.trim(),
          email,
          phone: form.phone.trim(),
          addresses: [form.address.trim()],
        })
      }

      const orderItems = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image,
      }))

      const order = await createOrder({
        userId: user.id,
        customer: {
          name: form.name.trim(),
          email,
          phone: form.phone.trim(),
          address: form.address.trim(),
        },
        items: orderItems,
        total: cartTotal,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })

      clearCart()
      navigate(`/orders/${order.id}`, { replace: true })
    } catch (err) {
      setError(
        err.message || 'Unable to place your order. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <section className="water-surface overflow-hidden rounded-3xl px-6 py-16 text-center shadow-xl sm:px-12">
        <span className="text-5xl" aria-hidden="true">◇</span>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
          Ready when you are
        </p>

        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Your cart is empty
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/75">
          Your next favourite find is waiting. Explore our collection and
          discover something worth bringing home.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-aqua px-8 py-3 font-bold text-brand-black transition hover:bg-white"
        >
          Explore the Collection
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-9">
      <header className="water-surface overflow-hidden rounded-3xl px-6 py-10 shadow-xl sm:px-10 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
          Diamonds and Dimes
        </p>

        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Almost Yours.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
          Just a few details between you and your next favourite find.
          Complete your delivery information below.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/85">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
            01 · Your Details
          </span>
          <span className="text-brand-gold">→</span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
            02 · Order Review
          </span>
          <span className="text-brand-gold">→</span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
            03 · Confirmation
          </span>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
          <div className="space-y-7 lg:col-span-3">
            <div className="rounded-3xl border border-brand-aqua/20 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-aqua/15 text-lg font-bold text-brand-deep-aqua">
                  01
                </span>

                <div>
                  <h2 className="font-display text-2xl text-brand-black">
                    Delivery Information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Where should we send your order?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Email Address
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Phone Number
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="e.g. 0712 345 678"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="mb-2 block text-sm font-semibold text-brand-black"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="checkout-address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    autoComplete="street-address"
                    placeholder="Enter your delivery location and any helpful directions"
                    required
                    rows={4}
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl" aria-hidden="true">✦</span>
                <div>
                  <h3 className="font-bold text-brand-black">
                    A little note about payment
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This is a demonstration checkout. No real payment is
                    collected or processed. Submitting your order creates
                    a demo order record for the project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-brand-aqua/20 bg-white shadow-sm">
              <div className="bg-brand-black px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-aqua">
                  Your Selection
                </p>
                <h2 className="mt-1 font-display text-2xl text-white">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-ivory">
                      <img
                        src={getProductImageUrl(item.image)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-bold text-brand-black">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="mt-2 text-sm font-bold text-brand-deep-aqua">
                        {formatKES(Number(item.price) * Number(item.quantity))}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="space-y-3 border-t border-dashed border-gray-200 pt-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Items</span>
                    <span>
                      {cart.reduce(
                        (total, item) => total + Number(item.quantity),
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-brand-deep-aqua">
                      To be arranged
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="font-bold text-brand-black">
                      Order Total
                    </span>
                    <span className="font-display text-2xl text-brand-gold">
                      {formatKES(cartTotal)}
                    </span>
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-brand-black px-6 py-4 font-bold text-brand-aqua shadow-lg transition hover:bg-brand-deep-aqua hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Placing Your Order...' : 'Place My Order →'}
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  By placing your order, you confirm that your delivery
                  information is correct.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-aqua/20 bg-brand-aqua/5 p-5 text-center">
              <p className="font-display text-lg text-brand-black">
                Luxury in Every Choice.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Thank you for shopping with Diamonds and Dimes.
              </p>
            </div>
          </aside>
        </div>
      </form>

      <div className="text-center">
        <Link
          to="/cart"
          className="text-sm font-semibold text-brand-deep-aqua transition hover:text-brand-black"
        >
          ← Return to Cart
        </Link>
      </div>
    </section>
  )
}
