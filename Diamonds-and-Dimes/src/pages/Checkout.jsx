
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function Checkout() {
  const { cart, cartTotal } = useShop()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

 

 

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-brand-black">
        Checkout
      </h1>

      {/* CUSTOMER DETAILS */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="checkout-name" className="mb-1 block">
            Name
          </label>
          <input
            id="checkout-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="min-h-11 w-full rounded-md border border-brand-charcoal/25 bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="checkout-email" className="mb-1 block">
            Email
          </label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="min-h-11 w-full rounded-md border border-brand-charcoal/25 bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="checkout-phone" className="mb-1 block">
            Phone
          </label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="min-h-11 w-full rounded-md border border-brand-charcoal/25 bg-white px-3"
          />
        </div>

        <div>
          <label htmlFor="checkout-address" className="mb-1 block">
            Delivery Address
          </label>
          <textarea
            id="checkout-address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full rounded-md border border-brand-charcoal/25 bg-white px-3 py-2"
          />
        </div>
      </form>

      {/* ORDER SUMMARY */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-semibold">Your Order</h2>

        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                KSh {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>KSh {cartTotal.toLocaleString()}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Your order details and payment will be processed when checkout
        submission is connected.
      </p>
    </section>
  )
}
