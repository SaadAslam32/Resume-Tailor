// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Resume Tailor',
  description: 'Tailor your resume effortlessly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Resume Tailor. All rights reserved.
        </footer>
      </body>
    </html>
  );
}