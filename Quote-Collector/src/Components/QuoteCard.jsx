import { useQuotes } from '../Context/QuoteContext'
import { formatDate } from '../Utils/format'

export default function QuoteCard({ quote }) {
  const { deleteQuote, toggleFavorite } = useQuotes()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quote.text)
      console.log('Quote copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      deleteQuote(quote.id)
    }
  }

  return (
    <div className="card quote-card fade-in">
      <div className="quote-text">
        "{quote.text}"
      </div>

      {quote.author && (
        <div className="quote-author">
          — {quote.author}
        </div>
      )}

      {quote.tags && quote.tags.length > 0 && (
        <div className="quote-tags">
          {quote.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="quote-actions">
        <div className="flex gap-1">
          <button
            className="action-btn"
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            📋
          </button>
          <button
            className="action-btn"
            onClick={() => toggleFavorite(quote.id)}
            title={quote.favorite ? 'Remove from favourites' : 'Add to favourites'}
          >
            {quote.favorite ? '💖' : '🤍'}
          </button>
          <button
            className="action-btn"
            onClick={handleDelete}
            title="Delete quote"
          >
            🗑️
          </button>
        </div>

        <div className="text-sm text-gray">
          {formatDate(quote.createdAt)}
        </div>
      </div>
    </div>
  )
}
