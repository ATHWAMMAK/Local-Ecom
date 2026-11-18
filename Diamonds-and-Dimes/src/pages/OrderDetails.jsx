import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getOrder } from '../services/api'

export default function OrderDetails() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true

        setLoading(true)
        setError('')

        getOrder(id)
        .then((foundOrder) => {
            if (active) {
                setOrder(foundOrder)
            }
        })
        .catch(() => {
            if (active) {
                setError('Order not found. Check the order number and try again.')
            }
        })
        .finally(() => {
            if (active) {
                setLoading(false)
            }
        })

        return() => {
            active = false
        }
    }, [id])
    if (loading) {
        return (
            <p className="mx-auto max-w-5xl px-4 py-12" role="status">
                Loading order...
            </p>
        )
    }

    if (error) {
        return (
            <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <p role="alert" className="text-brand-charcoal">
        {error}
      </p>

      <Link
        to="/orders"
        className="mt-4 inline-block underline decoration-brand-gold underline-offset-4"
      >
        Back to order history
      </Link>
    </section>
        )
    } 
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-brand-black">
        Order Tracking
      </h1>
    {order && (
  <div className="mt-6 rounded-md bg-white p-5 text-brand-charcoal">
    <h2 className="text-xl font-semibold text-brand-black">
      Order #{order.id}
    </h2>

    <p className="mt-3">
      Status: <span className="capitalize">{order.status || 'Unknown'}</span>
    </p>

    <p className="mt-1">
      Total: KES {Number(order.total || 0).toLocaleString()}
    </p>

    {order.createdAt && (
      <p className="mt-1">
        Placed: {new Date(order.createdAt).toLocaleString()}
      </p>
    )}

    <p className="mt-4 text-sm text-brand-charcoal/70">
      This status comes from the demo order record; it is not live delivery tracking.
    </p>
  </div>
)}
     
    </section>
  )
}
