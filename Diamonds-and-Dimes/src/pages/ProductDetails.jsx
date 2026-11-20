import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../services/api'
import { getProductImageUrl } from '../utils/productImage'
import { useShop } from '../context/ShopContext'

const kes = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  currencyDisplay: 'code',
  maximumFractionDigits: 2,
})

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart, toggleWishlist, wishlist } = useShop()

  const [result, setResult] = useState({
    id: null,
    status: 'loading',
    product: null,
  })

  const [qty, setQty] = useState('1')
  const [addedId, setAddedId] = useState(null)

  useEffect(() => {
    let active = true

    getProduct(id)
      .then((data) => {
        if (!active) return

        if (!data || Object.keys(data).length === 0) {
          setResult({ id, status: 'notfound', product: null })
          return
        }

        setResult({ id, status: 'ready', product: data })
        setQty('1')
      })
      .catch((error) => {
        if (!active) return

        setResult({
          id,
          status: error.status === 404 ? 'notfound' : 'error',
          product: null,
        })
      })

    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    if (addedId === null) return

    const timer = setTimeout(() => setAddedId(null), 2500)
    return () => clearTimeout(timer)
  }, [addedId])

  const isCurrent = result.id === id
  const status = isCurrent ? result.status : 'loading'
  const product = isCurrent ? result.product : null

  if (status === 'loading') {
    return (
      <div className="rounded-3xl border border-brand-aqua/30 bg-white px-6 py-24 text-center shadow-lg">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand-aqua/30 border-t-brand-deep-aqua" />
        <p className="mt-5 font-semibold text-brand-black">
          Preparing something special...
        </p>
        <p className="mt-2 text-sm text-brand-charcoal/60">
          Loading product details.
        </p>
      </div>
    )
  }

  if (status === 'notfound') {
    return (
      <div className="rounded-3xl border border-brand-aqua/30 bg-white px-6 py-20 text-center shadow-lg">
        <p className="font-handwritten text-xl text-brand-deep-aqua">
          A little detour
        </p>
        <h1 className="mt-3 font-display text-3xl text-brand-black">
          Product not found
        </h1>
        <p className="mt-3 text-sm text-brand-charcoal/65">
          This product may no longer be available.
        </p>
        <Link
          to="/shop"
          className="mt-7 inline-flex rounded-full bg-brand-black px-7 py-3 font-semibold text-brand-aqua transition hover:bg-brand-aqua hover:text-brand-black"
        >
          Return to the collection
        </Link>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-3xl border border-brand-aqua/30 bg-white px-6 py-20 text-center shadow-lg">
        <h1 className="font-display text-3xl text-brand-black">
          We couldn't load this product
        </h1>
        <p className="mt-3 text-brand-charcoal/65">
          Please check your connection and try again.
        </p>
        <Link
          to="/shop"
          className="mt-7 inline-flex rounded-full bg-brand-black px-7 py-3 font-semibold text-brand-aqua transition hover:bg-brand-aqua hover:text-brand-black"
        >
          Back to shop
        </Link>
      </div>
    )
  }

  const stock = Number(product.stock) || 0
  const outOfStock = stock <= 0
  const added = addedId === product.id
  const saved = wishlist.some(
    (item) => String(item.id) === String(product.id)
  )

  const clampQty = (value) =>
    Math.min(Math.max(Math.floor(Number(value)) || 1, 1), stock)

  function handleAddToCart() {
    if (outOfStock) return

    const quantity = clampQty(qty)
    setQty(String(quantity))
    addToCart(product, quantity)
    setAddedId(product.id)
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 text-sm text-brand-charcoal/60">
        <Link
          to="/"
          className="transition hover:text-brand-deep-aqua"
        >
          Home
        </Link>
        <span>/</span>
        <Link
          to="/shop"
          className="transition hover:text-brand-deep-aqua"
        >
          Shop
        </Link>
        <span>/</span>
        <span className="font-semibold text-brand-deep-aqua">
          {product.category}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product photography */}
        <div className="space-y-4">
          <div className="water-surface relative overflow-hidden rounded-3xl p-4 shadow-xl sm:p-6">
            <div className="relative z-10 overflow-hidden rounded-2xl border border-white/40 bg-white shadow-2xl">
              <img
                src={getProductImageUrl(product.image)}
                alt={product.name}
                className="aspect-square w-full object-cover"
                width="800"
                height="800"
              />
            </div>

            <span className="absolute left-7 top-7 z-20 rounded-full border border-brand-gold/60 bg-brand-black/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
              Selected for you
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-brand-aqua/30 bg-white p-4 text-center">
              <span className="text-xl text-brand-deep-aqua">✧</span>
              <p className="mt-1 text-xs font-semibold text-brand-black">
                Curated finds
              </p>
            </div>
            <div className="rounded-2xl border border-brand-gold/40 bg-white p-4 text-center">
              <span className="text-xl text-brand-gold">◇</span>
              <p className="mt-1 text-xs font-semibold text-brand-black">
                Quality picks
              </p>
            </div>
            <div className="rounded-2xl border border-brand-aqua/30 bg-white p-4 text-center">
              <span className="text-xl text-brand-deep-aqua">♡</span>
              <p className="mt-1 text-xs font-semibold text-brand-black">
                Made to delight
              </p>
            </div>
          </div>
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center rounded-3xl border border-brand-aqua/30 bg-white p-6 shadow-xl sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-deep-aqua">
            Diamonds and Dimes Collection
          </p>

          <p className="mt-5 inline-flex w-fit rounded-full bg-brand-aqua/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-deep-aqua">
            {product.category}
          </p>

          <h1 className="mt-5 font-display text-3xl leading-tight text-brand-black sm:text-5xl">
            {product.name}
          </h1>

          {product.rating != null && (
            <div
              className="mt-5 flex items-center gap-2"
              aria-label={`Rated ${product.rating} out of 5`}
            >
              <span className="text-lg tracking-widest text-brand-gold">
                ★★★★★
              </span>
              <span className="text-sm font-semibold text-brand-charcoal">
                {Number(product.rating).toFixed(1)} / 5
              </span>
            </div>
          )}

          <div className="mt-7 border-y border-brand-aqua/20 py-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/50">
              Our price
            </p>
            <p className="mt-2 font-display text-3xl text-brand-deep-aqua sm:text-4xl">
              {kes.format(Number(product.price))}
            </p>
          </div>

          <div className="mt-7">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-black">
              Product description
            </h2>
            <p className="mt-3 text-sm leading-8 text-brand-charcoal/75">
              {product.description}
            </p>
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-brand-ivory p-4">
            <span
              className={`h-3 w-3 rounded-full ${
                outOfStock ? 'bg-red-500' : 'bg-green-600'
              }`}
            />
            <div>
              <p className="text-sm font-bold text-brand-black">
                {outOfStock ? 'Currently out of stock' : 'Available to order'}
              </p>
              <p className="mt-1 text-xs text-brand-charcoal/60">
                {outOfStock
                  ? 'Please check back later.'
                  : `${stock} items currently available`}
              </p>
            </div>
          </div>

          {!outOfStock && (
            <div className="mt-7">
              <label
                htmlFor="product-quantity"
                className="mb-3 block text-sm font-bold text-brand-black"
              >
                Quantity
              </label>

              <input
                id="product-quantity"
                type="number"
                min="1"
                max={stock}
                value={qty}
                onChange={(event) => setQty(event.target.value)}
                onBlur={() => setQty(String(clampQty(qty)))}
                className="w-28 rounded-xl border border-brand-aqua/50 bg-brand-ivory px-4 py-3 text-center font-semibold text-brand-black outline-none transition focus:border-brand-deep-aqua focus:ring-2 focus:ring-brand-aqua/30"
              />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={outOfStock}
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-brand-black px-6 py-4 text-sm font-bold text-brand-aqua shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-brand-aqua hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={saved}
              className="flex-1 rounded-full border border-brand-gold bg-white px-6 py-4 text-sm font-bold text-brand-black transition duration-300 hover:-translate-y-1 hover:bg-brand-gold"
            >
              {saved ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
            </button>
          </div>

          <p
            className="mt-4 min-h-6 text-center text-sm font-semibold text-brand-deep-aqua"
            role="status"
            aria-live="polite"
          >
            {added ? '✓ Successfully added to your cart!' : ''}
          </p>

          <div className="mt-5 border-t border-brand-aqua/20 pt-5">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep-aqua transition hover:text-brand-black"
            >
              <span aria-hidden="true">←</span>
              Continue exploring the collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
