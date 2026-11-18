export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-semibold text-brand-black"
      >
        Search Products
      </label>

      <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/30">
        <input
          id="product-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search by product name or description..."
          className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearch('')}
            className="px-4 text-sm font-semibold text-brand-gold transition hover:bg-brand-black hover:text-white"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
