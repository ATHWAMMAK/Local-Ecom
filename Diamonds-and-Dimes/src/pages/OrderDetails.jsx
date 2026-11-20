import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../services/api'
import { getProductImageUrl } from '../utils/productImage'

const formatKES = (amount) =>
  `KSh ${Number(amount || 0).toLocaleString('en-KE')}`

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

  const loading = result.id !== id || result.loading

  if (loading) {
    return (
      <section className="rounded-3xl border border-brand-aqua/20 bg-white px-6 py-20 text-center shadow-sm">
        <div
          className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-aqua/20 border-t-brand-deep-aqua"
          role="status"
          aria-label="Loading order"
        />
        <p className="mt-5 font-semibold text-brand-black">
          Preparing your order details...
        </p>
      </section>
    )
  }

  if (result.error || !result.order) {
    return (
      <section className="water-surface rounded-3xl px-6 py-16 text-center shadow-xl sm:px-12">
        <span className="text-5xl text-brand-gold" aria-hidden="true">◇</span>

        <h1 className="mt-5 font-display text-3xl text-white">
          Order Not Found
        </h1>

        <p role="alert" className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/75">
          {result.error || 'We could not find that order.'}
        </p>

        <Link
          to="/orders"
          className="mt-7 inline-flex rounded-full bg-brand-aqua px-7 py-3 font-bold text-brand-black transition hover:bg-white"
        >
          View Order History
        </Link>
      </section>
    )
  }

  const order = result.order
  const customer = order.customer || {}
  const items = Array.isArray(order.items) ? order.items : []
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-KE', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Date unavailable'

  const status = order.status || 'pending'

  return (
    <section className="space-y-8">
      <header className="water-surface overflow-hidden rounded-3xl px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-aqua/50 bg-brand-aqua/15 text-3xl text-brand-aqua">
          ✓
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
          Diamonds and Dimes
        </p>

        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Order Received!
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
          Thank you for choosing us. Your order has been recorded successfully.
          Here is your order summary.
        </p>

        <div className="mx-auto mt-7 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white">
          <span className="text-brand-aqua">Order number</span>
          <span className="font-bold">#{order.id}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-3">
        <div className="space-y-7 lg:col-span-2">
          <div className="rounded-3xl border border-brand-aqua/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep-aqua">
                  Order information
                </p>
                <h2 className="mt-2 font-display text-2xl text-brand-black">
                  Your Order
                </h2>
              </div>

              <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm font-bold capitalize text-brand-black">
                {status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border-y border-gray-100 py-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Order number</p>
                <p className="mt-1 font-bold text-brand-black">#{order.id}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Date placed</p>
                <p className="mt-1 font-semibold text-brand-black">
                  {orderDate}
                </p>
              </div>
            </div>

            <h3 className="mb-5 mt-7 font-display text-xl text-brand-black">
              Items Ordered
            </h3>

            {items.length > 0 ? (
              <div className="space-y-5">
                {items.map((item, index) => (
                  <div
                    key={`${item.productId || item.id || item.name}-${index}`}
                    className="flex items-center gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-ivory">
                      {item.image ? (
                        <img
                          src={getProductImageUrl(item.image)}
                          alt={item.name || 'Ordered product'}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl text-brand-deep-aqua">
                          ◇
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-brand-black">
                        {item.name || 'Product'}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {Number(item.quantity || 0)}
                      </p>
                      <p className="mt-1 text-sm text-brand-deep-aqua">
                        {formatKES(item.price)} each
                      </p>
                    </div>

                    <p className="shrink-0 text-right font-bold text-brand-black">
                      {formatKES(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No individual product details are available for this order.
              </p>
            )}

            <div className="mt-7 flex items-center justify-between border-t border-dashed border-gray-200 pt-6">
              <span className="font-bold text-brand-black">
                Order Total
              </span>
              <span className="font-display text-2xl text-brand-gold">
                {formatKES(order.total)}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-aqua/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-aqua/15 text-xl text-brand-deep-aqua">
                ♧
              </span>
              <div>
                <h2 className="font-display text-2xl text-brand-black">
                  Delivery Information
                </h2>
                <p className="text-sm text-gray-500">
                  Details provided at checkout
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Customer name</p>
                <p className="mt-1 font-semibold text-brand-black">
                  {customer.name || 'Not provided'}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email address</p>
                <p className="mt-1 font-semibold text-brand-black">
                  {customer.email || 'Not provided'}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Phone number</p>
                <p className="mt-1 font-semibold text-brand-black">
                  {customer.phone || 'Not provided'}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Delivery address</p>
                <p className="mt-1 font-semibold leading-6 text-brand-black">
                  {customer.address || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-brand-aqua/20 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep-aqua">
              Order status
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-aqua/15 text-brand-deep-aqua">
                ✓
              </span>
              <div>
                <p className="font-bold capitalize text-brand-black">
                  {status}
                </p>
                <p className="text-xs text-gray-500">
                  Current recorded status
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-brand-ivory p-4">
              <p className="text-xs leading-6 text-gray-600">
                This is a demonstration order record. Status information is
                not connected to a live courier or delivery-tracking service.
              </p>
            </div>
          </div>

          <div className="water-surface rounded-3xl p-6 text-center shadow-lg">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Thank you
            </p>
            <h2 className="mt-3 font-display text-2xl text-white">
              Luxury in Every Choice.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              We appreciate your support of Diamonds and Dimes.
            </p>
          </div>

          <Link
            to="/shop"
            className="flex w-full items-center justify-center rounded-full bg-brand-black px-6 py-4 text-center font-bold text-brand-aqua transition hover:bg-brand-deep-aqua hover:text-white"
          >
            Continue Shopping →
          </Link>

          <Link
            to="/orders"
            className="block py-2 text-center text-sm font-semibold text-brand-deep-aqua transition hover:text-brand-black"
          >
            View Order History
          </Link>
        </aside>
      </div>
    </section>
  )
}
