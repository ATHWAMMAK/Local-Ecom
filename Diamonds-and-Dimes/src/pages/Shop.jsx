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

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products]
  )

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim()

      result = result.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        (product.description || '').toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category === selectedCategory
      )
    }

    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'price-high':
        result.sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'rating':
        result.sort((a, b) => Number(b.rating) - Number(a.rating))
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
    <section className="space-y-10">
      {/* Collection hero */}
      <div className="water-surface relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-24">
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-aqua/40 bg-black/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-aqua backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            The Diamonds and Dimes Collection
          </span>

          <p className="mt-7 font-handwritten text-lg text-brand-champagne sm:text-xl">
            Thoughtfully selected. Beautifully presented.
          </p>

          <h1 className="mt-4 font-display text-4xl leading-tight tracking-wide text-white sm:text-6xl">
            Discover Your
            <span className="block text-brand-aqua">Next Favourite</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Explore a curated collection of quality finds across fashion,
            technology, beauty, lifestyle and more.
          </p>

          <a
            href="#collection"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-brand-aqua px-8 py-3.5 text-sm font-bold text-brand-black shadow-lg shadow-brand-aqua/20 transition duration-300 hover:-translate-y-1 hover:bg-brand-gold"
          >
            Explore the collection <span className="ml-2">↓</span>
          </a>
        </div>

        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-brand-aqua/20" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-brand-gold/20" />
      </div>

      {/* Collection introduction */}
      <div id="collection" className="scroll-mt-28">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-deep-aqua">
              Find something exceptional
            </p>
            <h2 className="mt-2 font-display text-3xl text-brand-black sm:text-4xl">
              Shop the Collection
            </h2>
            <p className="mt-2 text-sm text-brand-charcoal/65">
              Eight collections. Endless possibilities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-brand-gold/50 bg-white px-4 py-2 text-xs font-semibold text-brand-black">
              {categories.length} Categories
            </span>
            <span className="rounded-full border border-brand-aqua/50 bg-brand-aqua/10 px-4 py-2 text-xs font-semibold text-brand-deep-aqua">
              {products.length} Products
            </span>
          </div>
        </div>

        {/* Search and filtering panel */}
        <div className="rounded-3xl border border-brand-aqua/30 bg-white p-5 shadow-xl shadow-brand-black/5 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-black text-lg text-brand-aqua">
              ✧
            </span>
            <div>
              <h3 className="font-semibold text-brand-black">
                Find your perfect pick
              </h3>
              <p className="text-xs text-gray-500">
                Search, filter and discover.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-deep-aqua">
                Search collection
              </label>
              <SearchBar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-deep-aqua">
                Browse category
              </label>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            <div>
              <label
                htmlFor="sort-products"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-deep-aqua"
              >
                Sort collection
              </label>
              <select
                id="sort-products"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="w-full rounded-xl border border-brand-aqua/40 bg-brand-ivory px-4 py-3 text-sm text-brand-black outline-none transition focus:border-brand-deep-aqua focus:ring-2 focus:ring-brand-aqua/30"
              >
                <option value="default">Featured products</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product results heading */}
        <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-brand-black">
              {selectedCategory === 'all' ? 'Our Curated Finds' : selectedCategory}
            </h2>
            <p className="mt-1 text-sm text-gray-500" aria-live="polite">
              {loading
                ? 'Preparing your collection...'
                : `Showing ${filteredProducts.length} of ${products.length} products`}
            </p>
          </div>

          {(searchTerm || selectedCategory !== 'all' || sortOption !== 'default') && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-brand-gold px-5 py-2.5 text-xs font-bold text-brand-black transition hover:bg-brand-gold"
            >
              Clear all filters ↺
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="rounded-3xl border border-brand-aqua/20 bg-white py-20 text-center" role="status">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-aqua/20 border-t-brand-deep-aqua" />
            <p className="mt-5 text-sm font-medium text-brand-charcoal">
              Preparing something special for you...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-red-700">
              We couldn't load the collection
            </h2>
            <p className="mt-3 text-sm text-red-600">{error}</p>
            <p className="mt-2 text-sm text-gray-600">
              Please check your connection and try again.
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
          <div className="rounded-3xl border border-brand-aqua/30 bg-white px-6 py-16 text-center shadow-sm">
            <span className="text-4xl text-brand-gold">◇</span>
            <h2 className="mt-4 font-display text-2xl text-brand-black">
              Nothing found just yet
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Try another search term or explore a different category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-7 rounded-full bg-brand-black px-7 py-3 text-sm font-semibold text-brand-aqua transition hover:bg-brand-aqua hover:text-brand-black"
            >
              Explore all products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
