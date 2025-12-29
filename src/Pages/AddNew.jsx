import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuoteForm from '../Components/QuoteForm'

export default function AddNew() {
  const [activeTab, setActiveTab] = useState('quote')
  const navigate = useNavigate()

  const handleSuccess = () => {
    // Navigate to the appropriate page after adding
    const targetPage = activeTab === 'writing' ? '/my-writings' : '/all-quotes'
    navigate(targetPage)
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 className="text-3xl font-bold mb-4">Add New Content</h1>
      
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setActiveTab('quote')}
          className={`btn ${activeTab === 'quote' ? 'btn-primary' : 'btn-secondary'}`}
        >
          📝 Add Quote
        </button>
        <button
          onClick={() => setActiveTab('writing')}
          className={`btn ${activeTab === 'writing' ? 'btn-primary' : 'btn-secondary'}`}
        >
          ✍️ Add Writing
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid grid-1" style={{ maxWidth: '600px' }}>
        {activeTab === 'quote' && (
          <div>
            <p className="text-gray mb-3">
              Add inspiring quotes from your favorite authors, books, or speeches.
            </p>
            <QuoteForm type="quote" onSuccess={handleSuccess} />
          </div>
        )}

        {activeTab === 'writing' && (
          <div>
            <p className="text-gray mb-3">
              Share your own thoughts, poems, stories, or any creative writing.
            </p>
            <QuoteForm type="writing" onSuccess={handleSuccess} />
          </div>
        )}
      </div>
    </div>
  )
}