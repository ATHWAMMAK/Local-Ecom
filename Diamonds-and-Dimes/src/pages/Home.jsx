import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export default function Home() {
  const store = useStore()
  const electronics = store.products.filter(
    (product) => product.category.toLowerCase() === 'electronics',
  )
  const featuredProducts = electronics.slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="rounded-lg bg-brand-champagne px-6 py-12 sm:px-10">
        <p className="text-sm font-semibold uppercase text-brand-charcoal/70">
          Tech for everyday life
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold text-brand-black">
          The right tech. The right price.
        </h1>
        <p className="mt-4 max-w-2xl leading-7">
          Shop electronics that make work, play, and daily life a little easier.
        </p>
        <Link
          className="mt-6 inline-block rounded bg-brand-black px-5 py-3 font-semibold text-brand-ivory hover:bg-brand-charcoal"
          to="/shop"
        >
          Explore the shop
        </Link>
      </section>

      <section>
        <p className="text-sm font-semibold uppercase text-brand-charcoal/60">
          A good place to start
        </p>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Featured electronics</h2>
          <Link className="font-semibold underline decoration-brand-gold decoration-2 underline-offset-4" to="/shop">
            View all products
          </Link>
        </div>

        {store.isLoading && <p>Loading products...</p>}
        {store.productsError && <p role="alert">{store.productsError}</p>}
        {!store.isLoading && !store.productsError && featuredProducts.length === 0 && (
          <p>No electronics are available right now.</p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={store.wishlist.includes(product.id)}
              onAddToCart={store.addToCart}
              onToggleWishlist={store.toggleWishlist}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 border-y border-brand-champagne py-8 sm:grid-cols-3">
        <div>
          <h2 className="font-bold">Practical tech</h2>
          <p className="mt-2 text-sm leading-6 text-brand-charcoal/70">
            Useful electronics, selected for everyday needs.
          </p>
        </div>
        <div>
          <h2 className="font-bold">Clear choices</h2>
          <p className="mt-2 text-sm leading-6 text-brand-charcoal/70">
            Product details and prices are easy to compare.
          </p>
        </div>
        <div>
          <h2 className="font-bold">Need a hand?</h2>
          <p className="mt-2 text-sm leading-6 text-brand-charcoal/70">
            <Link
              className="underline decoration-brand-gold decoration-2 underline-offset-4"
              to="/contact"
            >
              Get in touch with our team.
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
