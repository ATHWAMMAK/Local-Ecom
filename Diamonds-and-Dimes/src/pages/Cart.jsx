import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const kes = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', currencyDisplay: 'code', maximumFractionDigits: 0 })

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useShop()
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-aqua-deep">Your selection</p>
      <h1 className="mt-2 text-3xl font-semibold text-brand-black md:text-4xl">Shopping cart</h1>
      {cart.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-brand-gold/40 bg-white p-8 text-center">
          <p>Your cart is waiting for something special.</p>
          <Link className="mt-5 inline-block rounded-full bg-brand-black px-6 py-3 font-semibold text-brand-gold" to="/shop">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            {cart.map((item) => (
              <article key={item.id} className="flex gap-4 rounded-3xl border border-brand-gold/30 bg-white p-4">
                <img className="h-24 w-24 rounded-2xl bg-brand-aqua/20 object-cover" src={item.image} alt={item.name} />
                <div className="flex min-w-0 flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div><h2 className="font-semibold">{item.name}</h2><p className="mt-1 text-brand-aqua-deep">{kes.format(Number(item.price))}</p></div>
                  <div className="mt-3 flex items-center gap-3 sm:mt-0">
                    <label className="sr-only" htmlFor={`quantity-${item.id}`}>Quantity for {item.name}</label>
                    <input id={`quantity-${item.id}`} className="w-16 rounded-lg border border-brand-aqua-deep px-2 py-1" type="number" min="1" max={item.stock} value={item.quantity} onChange={(event) => updateCartQuantity(item.id, Math.min(Number(event.target.value) || 1, item.stock))} />
                    <button className="text-sm underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-3xl border border-brand-gold/50 bg-brand-aqua/20 p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <p className="mt-5 flex justify-between border-t border-brand-black/15 pt-4 font-semibold"><span>Total</span><span>{kes.format(total)}</span></p>
            <Link className="mt-6 block rounded-full bg-brand-black px-5 py-3 text-center font-semibold text-brand-gold" to="/checkout">Continue to checkout</Link>
          </aside>
        </div>
      )}
    </section>
  )
}
