export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="w-full">
      <label
        htmlFor="category-filter"
        className="mb-2 block text-sm font-semibold text-brand-black"
      >
        Filter by Category
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="w-full rounded-lg border border-brand-aqua/40 bg-white px-4 py-3 text-sm outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/30"
      >
        <option value="all">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
