import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { getProductImageUrl } from '../utils/productImage'

const kes = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  currencyDisplay: 'code',
  maximumFractionDigits: 0,
})

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <div className="water-surface relative overflow-hidden rounded-3xl px-6 py-12 text-white shadow-lg sm:px-10">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-aqua">
            Kept close
          </p>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl">
            Your Favourite Finds.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
            A little collection of things you've had your eye on.
            Save your favourites and come back whenever you're ready.
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-3xl border border-brand-gold/30 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-aqua/15 text-3xl text-brand-deep-aqua">
            ♡
          </div>

          <h2 className="mt-5 font-display text-2xl text-brand-black">
            Nothing saved just yet.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-brand-charcoal/65">
            When something catches your eye, add it to your wishlist.
            Your favourite finds will be waiting here.
          </p>

          <Link
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-black px-7 py-3 text-sm font-semibold text-brand-aqua transition hover:bg-brand-deep-aqua hover:text-white"
            to="/shop"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl text-brand-black">
                Your saved collection
              </h2>

              <p className="mt-1 text-sm text-brand-charcoal/60">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>

            <Link
              to="/shop"
              className="text-sm font-semibold text-brand-deep-aqua underline underline-offset-4 hover:text-brand-black"
            >
              Continue exploring
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => {
              const inStock = Number(product.stock) > 0

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-brand-aqua/25 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="block overflow-hidden bg-brand-ivory"
                  >
                    <img
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                      src={getProductImageUrl(product.image)}
                      alt={product.name}
                      loading="lazy"
                    />
                  </Link>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep-aqua">
                      {product.category}
                    </p>

                    <Link to={`/products/${product.id}`}>
                      <h3 className="mt-2 text-lg font-semibold text-brand-black transition hover:text-brand-deep-aqua">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="mt-3 text-lg font-bold text-brand-gold">
                      {kes.format(Number(product.price))}
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        inStock ? 'text-brand-deep-aqua' : 'text-red-600'
                      }`}
                    >
                      {inStock ? `${product.stock} available` : 'Out of stock'}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="min-h-11 flex-1 rounded-xl bg-brand-black px-4 py-2 text-sm font-semibold text-brand-aqua transition hover:bg-brand-deep-aqua hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!inStock}
                        onClick={() => addToCart(product, 1)}
                      >
                        Add to cart
                      </button>

                      <button
                        type="button"
                        className="min-h-11 rounded-xl border border-brand-gold px-4 py-2 text-sm font-semibold text-brand-black transition hover:bg-brand-gold"
                        onClick={() => toggleWishlist(product)}
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        Remove ♡
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}
