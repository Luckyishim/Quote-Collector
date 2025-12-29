export default function About() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="grid grid-1" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <h1 className="text-3xl font-bold mb-4">About Quote Collector</h1>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Why Quote Collector?</h2>
            <p className="mb-3">
              In our fast-paced digital world, profound thoughts and inspiring words often get lost 
              in the noise. Quote Collector was born from the simple belief that wisdom should be 
              preserved, organized, and easily accessible whenever we need inspiration.
            </p>
            <p className="mb-3">
              Whether it's a powerful quote that changed your perspective, a beautiful poem that 
              touched your heart, or your own creative writings that deserve to be remembered, 
              this app provides a beautiful, organized space for all your meaningful content.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="mb-3" style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
              <li>Collect and organize quotes from your favorite authors</li>
              <li>Store your personal writings, poems, and thoughts</li>
              <li>Tag system for easy categorization and discovery</li>
              <li>Search functionality to find quotes instantly</li>
              <li>Favorite system to highlight your most loved quotes</li>
              <li>Clean, distraction-free interface for focus</li>
              <li>Local storage keeps your data private and accessible</li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Built With Love</h2>
            <p className="mb-3">
              This app was crafted with modern web technologies including React, providing a 
              smooth and responsive experience across all your devices. Your data is stored 
              locally on your device, ensuring privacy and instant access.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Philosophy</h2>
            <p className="mb-3">
              We believe that collecting meaningful quotes and writings is more than just 
              bookmarking - it's about creating a personal library of wisdom that reflects 
              your journey, values, and aspirations. Each quote you save becomes part of 
              your story.
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg italic text-primary">
              "Collect moments of wisdom, create a lifetime of inspiration."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}