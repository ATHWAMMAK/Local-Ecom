import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        className="block overflow-hidden bg-brand-ivory"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-gold">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h2 className="mb-2 text-lg font-semibold text-brand-black transition hover:text-brand-gold">
            {product.name}
          </h2>
        </Link>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold text-brand-black">
            KES {Number(product.price).toLocaleString('en-KE')}
          </span>

          <span className="text-sm text-gray-600">
            ★ {product.rating}
          </span>
        </div>

        <p className={`mb-4 text-xs font-medium ${
          product.stock > 0 ? 'text-green-700' : 'text-red-600'
        }`}>
          {product.stock > 0
            ? `${product.stock} available`
            : 'Out of stock'}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="block rounded-lg border border-brand-gold bg-brand-black px-4 py-3 text-center text-sm font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
