import { useQuotes } from '../Context/QuoteContext'
import QuoteCard from '../Components/QuoteCard'
import SearchBar from '../Components/SearchBar'
import TagFilter from '../Components/TagFilter'

export default function AllQuotes() {
  const { getFilteredQuotes, searchTerm, selectedTags } = useQuotes()
  
  const filteredQuotes = getFilteredQuotes('quote') // Only show quotes, not writings
  const hasFilters = searchTerm || selectedTags.length > 0

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 className="text-3xl font-bold mb-4">All Quotes</h1>
      
      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <SearchBar placeholder="Search quotes by text, author, or tags..." />
        <TagFilter />
      </div>

      {/* Results Summary */}
      <div className="mb-3">
        <p className="text-gray">
          {hasFilters 
            ? `Found ${filteredQuotes.length} quotes matching your criteria`
            : `Showing all ${filteredQuotes.length} quotes`
          }
        </p>
      </div>

      {/* Quotes Grid */}
      {filteredQuotes.length > 0 ? (
        <div className="grid grid-3">
          {filteredQuotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {hasFilters ? (
            <>
              <h3>No quotes found</h3>
              <p>Try adjusting your search terms or filters</p>
            </>
          ) : (
            <>
              <h3>No quotes yet</h3>
              <p>Start building your collection by adding your first quote!</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}