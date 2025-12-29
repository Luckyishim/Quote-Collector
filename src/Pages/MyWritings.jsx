import { Link } from 'react-router-dom'
import { useQuotes } from '../Context/QuoteContext'
import QuoteCard from '../Components/QuoteCard'
import SearchBar from '../Components/SearchBar'
import TagFilter from '../Components/TagFilter'

export default function MyWritings() {
  const { getFilteredQuotes, searchTerm, selectedTags } = useQuotes()
  
  const filteredWritings = getFilteredQuotes('writing') // Only show writings
  const hasFilters = searchTerm || selectedTags.length > 0

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="flex justify-between align-center mb-4">
        <h1 className="text-3xl font-bold">My Writings</h1>
        <Link to="/add-new" className="btn btn-primary">
          Add New Writing
        </Link>
      </div>
      
      <p className="text-gray mb-4">
        Your personal collection of poems, thoughts, and creative writings.
      </p>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <SearchBar placeholder="Search your writings..." />
        <TagFilter />
      </div>

      {/* Results Summary */}
      <div className="mb-3">
        <p className="text-gray">
          {hasFilters 
            ? `Found ${filteredWritings.length} writings matching your criteria`
            : `You have ${filteredWritings.length} writings`
          }
        </p>
      </div>

      {/* Writings Grid */}
      {filteredWritings.length > 0 ? (
        <div className="grid grid-2">
          {filteredWritings.map(writing => (
            <QuoteCard key={writing.id} quote={writing} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {hasFilters ? (
            <>
              <h3>No writings found</h3>
              <p>Try adjusting your search terms or filters</p>
            </>
          ) : (
            <>
              <h3>No writings yet</h3>
              <p>This is where your creative writings, poems, and thoughts will live. Start writing!</p>
              <Link to="/add-new" className="btn btn-primary mt-2">
                Write Something
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}