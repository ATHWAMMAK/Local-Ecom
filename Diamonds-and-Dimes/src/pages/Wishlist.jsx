import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const kes = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', currencyDisplay: 'code', maximumFractionDigits: 0 })

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop()

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-aqua-deep">Kept close</p>
      <h1 className="mt-2 text-3xl font-semibold text-brand-black md:text-4xl">My wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-brand-gold/40 bg-white p-8 text-center">
          <p>Your saved pieces will appear here.</p>
          <Link className="mt-5 inline-block rounded-full bg-brand-black px-6 py-3 font-semibold text-brand-gold" to="/shop">Browse the collection</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-brand-gold/40 bg-white">
              <Link to={`/products/${product.id}`}><img className="aspect-square w-full bg-brand-aqua/20 object-cover" src={product.image} alt={product.name} /></Link>
              <div className="p-5"><h2 className="font-semibold">{product.name}</h2><p className="mt-2 text-brand-aqua-deep">{kes.format(Number(product.price))}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-full bg-brand-black px-4 py-2 text-sm font-semibold text-brand-gold disabled:opacity-50" disabled={product.stock <= 0} onClick={() => addToCart(product, 1)}>Add to cart</button>
                  <button className="rounded-full border border-brand-aqua-deep px-4 py-2 text-sm font-medium" onClick={() => toggleWishlist(product)}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
