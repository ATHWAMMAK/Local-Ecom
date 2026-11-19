import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../services/api'

export default function OrderDetails() {
  const { id } = useParams()

  const [result, setResult] = useState({
    id: null,
    order: null,
    loading: true,
    error: '',
  })

  useEffect(() => {
    let active = true

    getOrder(id)
      .then((foundOrder) => {
        if (active) {
          setResult({
            id,
            order: foundOrder,
            loading: false,
            error: '',
          })
        }
      })
      .catch(() => {
        if (active) {
          setResult({
            id,
            order: null,
            loading: false,
            error: 'Order not found. Check the order number and try again.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [id])

  // Treat a new order ID as loading until its request completes.
  const loading = result.id !== id || result.loading

  if (loading) {
    return (
      <p className="mx-auto max-w-5xl px-4 py-12" role="status">
        Loading order...
      </p>
    )
  }

  if (result.error) {
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <p role="alert" className="text-brand-charcoal">
          {result.error}
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

  const order = result.order

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
            Status:{' '}
            <span className="capitalize">
              {order.status || 'Unknown'}
            </span>
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
            This status comes from the demo order record; it is not live
            delivery tracking.
          </p>
        </div>
      )}
    </section>
  )
}
