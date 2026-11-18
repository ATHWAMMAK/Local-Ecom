import { Link } from 'react-router-dom'

function formatPrice(price) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(price)
}

function ProductCard({ product, isWishlisted, onAddToCart, onToggleWishlist }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <img
          className="aspect-square w-full object-cover"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase text-brand-charcoal/60">
          {product.category}
        </p>
        <Link className="mt-2 text-lg font-bold hover:text-brand-charcoal/70" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-brand-charcoal/75">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">{formatPrice(product.price)}</span>
          {product.rating && <span className="text-sm">★ {product.rating}</span>}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 rounded bg-brand-black px-3 py-2 text-sm font-semibold text-brand-ivory transition-colors hover:bg-brand-charcoal disabled:cursor-not-allowed disabled:opacity-50"
            disabled={product.stock < 1}
            onClick={() => onAddToCart(product)}
            type="button"
          >
            {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
          </button>
          <button
            className="rounded border border-brand-champagne px-3 py-2 text-sm font-semibold transition-colors hover:bg-brand-champagne"
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
            onClick={() => onToggleWishlist(product.id)}
            type="button"
          >
            {isWishlisted ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
