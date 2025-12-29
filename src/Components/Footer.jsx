export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="text-center">
                    <p> &copy; {currentYear} Quotes App. Words that Works ❤️ </p>
                    <div className="flex justify-center gap-2 mt-2">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            GitHub
                        </a>
                        <span>•</span>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            Twitter
                        </a>
                        <span>•</span>
                        <a
                            href="mailto:contact@quotesapp.com"
                            className="text-primary"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}