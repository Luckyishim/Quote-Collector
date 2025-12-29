import { useQuotes } from '../Context/QuoteContext'

export default function TagFilter() {
  const { availableTags, selectedTags, toggleTagFilter, clearFilters } = useQuotes()

  return (
    <div className="filter-tags">
      {availableTags.map(tag => (
        <button
          key={tag}
          onClick={() => toggleTagFilter(tag)}
          className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
        >
          #{tag}
        </button>
      ))}

      {selectedTags.length > 0 && (
        <button
          onClick={clearFilters}
          className="btn btn-secondary btn-small"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
