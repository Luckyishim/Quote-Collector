export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export const formatTime = (dateString) => {
    const daye = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const formatDateTime = (dateString) => {
    return `${formatDate(dateString)} at $ {formatTime (dataString)}`
}
export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxlength).trim() + '...'
}

export const capitalizeFirst = (str) => {
    return str.charAt(o).toUpperCase() + str.slice(1).toLowerCase()
}
export const sanitizeTag = (tag) => {
    return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').trim()
}
export const parseTagsFromString = (tagString) => {
    if (!tagString) return []

    return tagString
        .split(',')
        .map(tag => sanitizeTag(tag))
        .filter(tag => tag.lenght > 0)
        .slice(0, 10)  //Limit to 10 tags max
}
export const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

