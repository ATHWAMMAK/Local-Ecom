import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function formatPrice(price) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function OrderDetails() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((savedOrder) => savedOrder.id === id)

  if (!order) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold">Order not found</h1>
        <p className="mt-3 text-brand-charcoal/70">Orders placed on this device will appear here.</p>
        <Link className="mt-5 inline-block underline" to="/shop">Return to the shop</Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase text-brand-charcoal/60">Order {order.id}</p>
      <h1 className="mt-1 text-3xl font-bold">Thanks, {order.customer.name}</h1>
      <p className="mt-3 inline-flex rounded-full bg-brand-champagne px-3 py-1 text-sm font-semibold">
        {order.status}
      </p>
      <p className="mt-4 text-sm text-brand-charcoal/70">
        Confirmation sent to {order.customer.email}. Order placed {new Date(order.createdAt).toLocaleString()}.
      </p>
      <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
        {order.items.map((item) => (
          <div className="flex justify-between gap-4 py-4" key={item.id}>
            <span>{item.name} <span className="text-brand-charcoal/65">× {item.quantity}</span></span>
            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 flex justify-between text-lg font-bold">
        <span>Total</span><span>{formatPrice(order.total)}</span>
      </p>
      <Link className="mt-7 inline-block underline" to="/shop">Continue shopping</Link>
    </section>
  )
}
