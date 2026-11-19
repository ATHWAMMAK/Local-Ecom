import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop()

  const saved = isInWishlist(product.id)
  const inStock = Number(product.stock) > 0

  return (
    <article className="group overflow-hidden rounded-xl border border-brand-aqua/30 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        className="block overflow-hidden bg-brand-ivory"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-deep-aqua">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h2 className="mb-2 text-lg font-semibold text-brand-black transition hover:text-brand-aqua">
            {product.name}
          </h2>
        </Link>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold text-brand-gold">
            KES {Number(product.price).toLocaleString('en-KE')}
          </span>

          <span className="text-sm text-gray-600">
            ★ {product.rating}
          </span>
        </div>

        <p
          className={`mb-4 text-xs font-medium ${
            inStock ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {inStock ? `${product.stock} available` : 'Out of stock'}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={!inStock}
            onClick={() => addToCart(product)}
            className="flex-1 rounded-lg bg-brand-black px-4 py-3 text-sm font-semibold text-brand-aqua transition hover:bg-brand-aqua hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-pressed={saved}
            className="rounded-lg border border-brand-gold px-4 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-gold"
          >
            {saved ? '♥ Saved' : '♡ Wishlist'}
          </button>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-3 block text-center text-sm font-semibold text-brand-deep-aqua underline underline-offset-4 hover:text-brand-black"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
