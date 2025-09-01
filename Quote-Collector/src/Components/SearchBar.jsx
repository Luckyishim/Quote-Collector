import { useQuotes } from '../Context/QuoteContext';

export default function SearchBar({ placeholder = "Search Quotes..." }) {
    const { searchTerm, setSearchTerm } = useQuotes()

    return (
        <div className="search-input">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="form-input"
            />
        </div>
    )
}