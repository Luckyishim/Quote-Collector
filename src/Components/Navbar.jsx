import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const isActiveLink = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/all-quotes', label: 'All Quotes' },
        { path: '/my-writings', label: 'My Writings' },
        { path: '/add-new', label: 'Add New' },
        { path: '/about', label: 'About' }
    ]

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        📝 Quote Collector
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="navbar-nav">
                        {navItems.map(item => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`navbar-link ${isActiveLink(item.path)}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`navbar-link ${isActiveLink(item.path)}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}