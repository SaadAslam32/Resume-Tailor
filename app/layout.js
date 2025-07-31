// app/layout.jsx
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata = {
  title: 'ResumeTailor.ai | AI-Powered Resume Optimization',
  description: 'Transform your resume in seconds to perfectly match any job description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] min-h-screen">
        <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-[var(--border-primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 font-heading">
                  ResumeTailor.ai
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        <main className="relative z-10">
          {children}
        </main>
        
        <footer className="py-8 text-center text-[var(--text-secondary)] text-sm border-t border-[var(--border-primary)] mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <p>© {new Date().getFullYear()} ResumeTailor.ai - AI-powered resume optimization</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="hover:text-[var(--accent-primary)] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--accent-primary)] transition">Terms of Service</a>
              <a href="#" className="hover:text-[var(--accent-primary)] transition">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}