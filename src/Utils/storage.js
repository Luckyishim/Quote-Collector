const STORAGE_KEY = 'quote-collector-quotes'

export const saveQuotes = (quotes) => {
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes))
    }catch(error){
        console.error('Error in saving quotes to localStorage:', error)
    }
}

export const loadQuotes = () => {
    try{
        const stored =localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored): []
    }catch (error){
        console.error('Error loading quotes from localStorage:', error)
        return []
    }
}

export const clearQuotes = () => {
    try{
        localStorage.removeITems(STORAGE_KEY)
    } catch (error){
        console.error('Error clearing quotes from localStorage:', error)
    }
}