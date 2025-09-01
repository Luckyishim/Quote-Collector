import { Link } from 'react-router-dom'
import { useQuotes } from '../Context/QuoteContext'
import QuoteCard from '../Components/QuoteCard'
import { getRandomItem } from '../Utils/format'

export default function Home() {
  const { quotes } = useQuotes()
  
  console.log('Home page - quotes from context:', quotes)
  
  // Get random quotes to display
  const favoriteQuotes = quotes.filter(q => q.favorite)
  const allQuotes = quotes.filter(q => q.type === 'quote')
  const recentQuotes = [...quotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
  
  const featuredQuote = favoriteQuotes.length > 0 
    ? getRandomItem(favoriteQuotes)
    : allQuotes.length > 0 
    ? getRandomItem(allQuotes)
    : null

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Quote Collector</h1>
          <p>Your personal sanctuary for inspiring quotes and meaningful writings</p>
          <Link to="/add-new" className="btn btn-secondary">
            Start Collecting
          </Link>
        </div>
      </section>

      <div className="container">
        {/* Featured Quote */}
        {featuredQuote && (
          <section className="mb-4">
            <h2 className="text-2xl font-bold mb-3 text-center">Quote of the Moment</h2>
            <div className="grid grid-1" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <QuoteCard quote={featuredQuote} />
            </div>
          </section>
        )}

        {/* Recent Quotes */}
        {recentQuotes.length > 0 && (
          <section className="mb-4">
            <h2 className="text-2xl font-bold mb-3">Recently Added</h2>
            <div className="grid grid-3">
              {recentQuotes.map(quote => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="mb-4">
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary">{quotes.length}</div>
              <div className="text-gray">Total Items</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary">
                {quotes.filter(q => q.favorite).length}
              </div>
              <div className="text-gray">Favorites</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary">
                {quotes.filter(q => q.type === 'writing').length}
              </div>
              <div className="text-gray">Your Writings</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-3">Quick Actions</h2>
          <div className="flex justify-center gap-2 flex-wrap">
            <Link to="/add-new" className="btn btn-primary">
              Add New Quote
            </Link>
            <Link to="/all-quotes" className="btn btn-secondary">
              Browse All Quotes
            </Link>
            <Link to="/my-writings" className="btn btn-secondary">
              My Writings
            </Link>
          </div>
        </section>

        {/* Empty State */}
        {quotes.length === 0 && (
          <div className="empty-state">
            <h3>Start Your Collection</h3>
            <p>You haven't added any quotes yet. Let's get started!</p>
            <Link to="/add-new" className="btn btn-primary mt-2">
              Add Your First Quote
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}