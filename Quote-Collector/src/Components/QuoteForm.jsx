import { useState } from 'react'
import { useQuotes } from '../Context/QuoteContext'
import { parseTagsFromString } from '../Utils/format'

export default function QuoteForm({ type = 'quote', onSuccess }) {
  const { addQuote, availableTags } = useQuotes()
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    tags: ''
  })
  const [selectedTags, setSelectedTags] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTagClick = (tag) => {
    const isSelected = selectedTags.includes(tag)
    let newSelectedTags
    
    if (isSelected) {
      // Remove tag
      newSelectedTags = selectedTags.filter(t => t !== tag)
    } else {
      // Add tag
      newSelectedTags = [...selectedTags, tag]
    }
    
    setSelectedTags(newSelectedTags)
    
    // Update the input field to show selected tags
    setFormData(prev => ({
      ...prev,
      tags: newSelectedTags.join(', ')
    }))
  }

  const handleTagInputChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      tags: value
    }))
    
    // Update selected tags based on manual input
    const manualTags = parseTagsFromString(value)
    setSelectedTags(manualTags.filter(tag => availableTags.includes(tag)))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.text.trim()) {
      alert('Please enter the quote text.')
      return
    }

    setIsSubmitting(true)

    try {
      // Combine selected tags with any manually typed tags
      const allTags = [...selectedTags, ...parseTagsFromString(formData.tags)]
      // Remove duplicates
      const uniqueTags = [...new Set(allTags)]
      
      console.log('Final tags:', uniqueTags) // Debug log
      
      const newQuote = {
        text: formData.text.trim(),
        author: formData.author.trim() || null,
        tags: uniqueTags,
        type: type
      }

      console.log('New quote object:', newQuote) // Debug log
      addQuote(newQuote)
      
      // Reset form
      setFormData({
        text: '',
        author: '',
        tags: ''
      })
      setSelectedTags([])

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error adding quote:', error)
      alert('Failed to add quote. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isWriting = type === 'writing'

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-3">
        Add New {isWriting ? 'Writing' : 'Quote'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text" className="form-label">
            {isWriting ? 'Your Writing' : 'Quote Text'} *
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder={isWriting 
              ? "Write your thoughts, poem, or story..."
              : "Enter the inspiring quote..."
            }
            className="form-input form-textarea"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            {isWriting ? 'Title (Optional)' : 'Author (Optional)'}
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder={isWriting 
              ? "Give your writing a title..."
              : "Who said this quote?"
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            Tags (Optional)
          </label>
          
          {/* Clickable Tag Buttons */}
          <div className="filter-tags mb-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              >
                #{tag}
              </button>
            ))}
          </div>
          
          {/* Manual Tag Input */}
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleTagInputChange}
            placeholder="Or type custom tags: motivation, wisdom, life..."
            className="form-input"
          />
          <small className="text-sm text-gray mt-1">
            Click tags above or type custom ones separated by commas. Selected: {selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}
          </small>
        </div>

        <button 
          type="submit" 
          className={`btn btn-primary ${isSubmitting ? 'opacity-50' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : `Add ${isWriting ? 'Writing' : 'Quote'}`}
        </button>
      </form>
    </div>
  )
}