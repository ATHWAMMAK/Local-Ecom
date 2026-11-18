import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOption, setSortOption] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')

        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Unable to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))]
      .sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim()

      result = result.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category === selectedCategory
      )
    }

    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break

      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break

      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break

      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break

      default:
        break
    }

    return result
  }, [products, searchTerm, selectedCategory, sortOption])

  function clearFilters() {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortOption('default')
  }

  return (
    <section className="min-h-screen bg-brand-ivory">
      {/* Shop heading */}
      <div className="bg-brand-black px-6 py-16 text-center sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-aqua">
          Diamonds and Dimes
        </p>

        <h1 className="text-3xl font-bold text-white sm:text-5xl">
          Discover Our Collection
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
          Explore quality products across our collections.
          Luxury in every choice, quality in every purchase.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="mb-8 grid grid-cols-1 gap-5 rounded-xl border border-brand-aqua/30 bg-white p-5 shadow-sm md:grid-cols-3">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="w-full">
            <label
              htmlFor="sort-products"
              className="mb-2 block text-sm font-semibold text-brand-black"
            >
              Sort Products
            </label>

            <select
              id="sort-products"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/30"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results information */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600" aria-live="polite">
            {loading
              ? 'Loading products...'
              : `Showing ${filteredProducts.length} of ${products.length} products`}
          </p>

          {(searchTerm || selectedCategory !== 'all' || sortOption !== 'default') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-brand-deep-aqua underline underline-offset-4 hover:text-brand-black"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-20 text-center" role="status">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-aqua" />
            <p className="mt-4 text-sm text-gray-600">
              Loading our collection...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-red-700">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <p className="mt-2 text-sm text-gray-600">
              Please check that the product server is running and try again.
            </p>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-xl border border-brand-aqua/30 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-brand-black">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-brand-aqua px-6 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-deep-aqua hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
