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

  const featuredProducts = products.slice(0, 3)

  return (
    <div className="space-y-14">

      {/* Hero section */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-black px-6 py-16 text-white sm:px-12 sm:py-24">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-aqua/20 blur-3xl" />

        <div className="relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-aqua">
            Diamonds and Dimes
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-6xl">
            Luxury in Every Choice.
            <span className="block text-brand-aqua">
              Quality in Every Purchase.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300">
            Discover carefully selected products across fashion,
            electronics, beauty, home essentials and more.
            Find quality that fits your lifestyle.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-lg bg-brand-aqua px-8 py-4 font-bold text-brand-black transition hover:bg-brand-gold"
          >
            Explore Our Collection
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-deep-aqua">
              Handpicked for you
            </p>

            <h2 className="mt-2 text-3xl font-bold text-brand-black">
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
