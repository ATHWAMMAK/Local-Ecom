import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import {
  getUserByEmail,
  createUser,
  createOrder,
} from '../services/api'

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

      // Find an existing demo customer.
      let user = await getUserByEmail(email)

      // Create a customer account if one does not exist.
      if (!user) {
        user = await createUser({
          name: form.name.trim(),
          email,
          phone: form.phone.trim(),
          addresses: [form.address.trim()],
        })
      }

      // Save a snapshot of the products being purchased.
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

      // Clear the cart only after the order is saved.
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
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-brand-black">
          Your cart is empty
        </h1>

        <p className="mt-3 text-gray-600">
          Add some products before checking out.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-block rounded-lg bg-brand-black px-6 py-3 font-semibold text-brand-aqua"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-black">
        Checkout
      </h1>

      <p className="mt-2 text-gray-600">
        Enter your delivery details to place your order.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        <div>
          <label htmlFor="checkout-name" className="mb-1 block font-medium">
            Full Name
          </label>

          <input
            id="checkout-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
            className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="checkout-email" className="mb-1 block font-medium">
            Email Address
          </label>

          <input
            id="checkout-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="checkout-phone" className="mb-1 block font-medium">
            Phone Number
          </label>

          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
            className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="checkout-address" className="mb-1 block font-medium">
            Delivery Address
          </label>

          <textarea
            id="checkout-address"
            name="address"
            value={form.address}
            onChange={handleChange}
            autoComplete="street-address"
            required
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          />
        </div>

        <div className="rounded-xl border border-brand-aqua/30 bg-white p-5">
          <h2 className="text-xl font-bold text-brand-black">
            Your Order
          </h2>

          <div className="mt-4 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  KSh {(Number(item.price) * item.quantity).toLocaleString('en-KE')}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-brand-gold">
              KSh {cartTotal.toLocaleString('en-KE')}
            </span>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-black px-6 py-4 font-bold text-brand-aqua transition hover:bg-brand-aqua hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>

      </form>

      <p className="mt-5 text-xs leading-5 text-gray-500">
        This is a demonstration checkout using a mock API.
        No real payment is collected or processed.
      </p>
    </section>
  )
}
