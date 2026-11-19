import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data)
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load featured products.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const featuredProducts = products.slice(0, 6)

  return (
    <div className="space-y-14">

      {/* Hero section */}
      <section className="water-surface relative flex min-h-[480px] items-center rounded-3xl px-6 py-16 text-white shadow-2xl shadow-brand-deep-aqua/20 sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full border border-brand-aqua/20 bg-brand-aqua/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 size-96 rounded-full bg-brand-deep-aqua/30 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.35em] text-brand-aqua">
            Diamonds and Dimes
          </p>

          <p className="mt-5 font-handwritten text-lg text-brand-champagne">
            A little luxury. A lot of character.
          </p>

          <h1 className="mt-4 font-display text-4xl leading-tight tracking-wide sm:text-6xl lg:text-7xl">
            Luxury in Every Choice.
            <span className="mt-2 block text-brand-aqua">
              Quality in Every Purchase.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">
            Discover carefully selected products across fashion,
            electronics, beauty, home essentials and more.
            Find quality that fits your lifestyle.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              to="/shop"
              className="inline-flex items-center rounded-full border border-brand-aqua bg-brand-aqua px-8 py-4 font-bold text-brand-black shadow-lg shadow-brand-aqua/20 transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:bg-brand-gold"
            >
              Explore Our Collection
              <span className="ml-3 text-xl" aria-hidden="true">→</span>
            </Link>

            <span className="text-sm font-medium tracking-wide text-brand-champagne">
              Discover something exceptional.
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-10 hidden text-right lg:block">
          <span className="block font-display text-6xl text-white/10">D&amp;D</span>
          <span className="text-xs uppercase tracking-[0.4em] text-brand-aqua/70">
            Curated living
          </span>
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-deep-aqua">
              Handpicked for you
            </p>

            <h2 className="mt-2 font-display text-3xl text-brand-black sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-2 text-gray-600">
              Explore some of our selected products.
            </p>
          </div>

          <Link
            to="/shop"
            className="font-semibold text-brand-deep-aqua underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-black"
          >
            View All Products
          </Link>
        </div>

        {loading && (
          <p className="py-10 text-center" role="status">
            Loading featured products...
          </p>
        )}

        {!loading && error && (
          <p className="rounded-xl bg-red-50 p-5 text-red-700" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && featuredProducts.length === 0 && (
          <p className="py-10 text-center">
            No featured products are available right now.
          </p>
        )}

        {!loading && !error && featuredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Shopping benefits */}
      <section className="grid gap-6 rounded-3xl border border-brand-aqua/30 bg-brand-aqua/10 p-8 sm:grid-cols-3 sm:p-10">
        <div>
          <h3 className="text-lg font-bold text-brand-black">
            Quality Selection
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Explore products selected with quality and value in mind.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-brand-black">
            Shopping Made Simple
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Search, compare, save favourites and shop with ease.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-brand-black">
            We're Here to Help
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            <Link
              to="/contact"
              className="font-semibold text-brand-deep-aqua underline"
            >
              Contact our support team.
            </Link>
          </p>
        </div>
      </section>

    </div>
  )
}
