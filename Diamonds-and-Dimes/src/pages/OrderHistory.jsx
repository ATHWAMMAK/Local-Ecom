import { useState } from 'react'
import { getUserByEmail, getOrdersByUserId } from '../services/api'

export default function OrderHistory() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-brand-black">Order History</h1>
      <p className="mt-4 text-brand-charcoal">
        Your order history page is being prepared.
      </p>
    </section>
  )
}
