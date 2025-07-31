
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import HistoryItem from '@/components/HistoryItem';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';
import { jsPDF } from 'jspdf';

export default function HistoryPage() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push('/auth/login');
        return;
      }
      setUser(data.user);

      try {
        const res = await fetch(`/api/history?userId=${data.user.id}`);
        if (res.ok) {
          const json = await res.json();
          setItems(json.items || []);
        } else {
          console.error('Failed to fetch history');
        }
      } catch (error) {
        console.error('History fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [router]);

  const downloadPDF = (content) => {
    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
      
      // Set margins
      const margin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - margin * 2;
      
      // Set font
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      // Add header
      doc.setFontSize(16);
      doc.setTextColor(40, 103, 248);
      doc.text('AI-Tailored Resume', margin, margin - 10);
      
      // Reset styles for content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Split the content into lines
      const lines = doc.splitTextToSize(content, maxWidth);
      
      let y = margin + 10;
      
      for (let i = 0; i < lines.length; i++) {
        // Check if we need a new page
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        
        // Write the line
        doc.text(lines[i], margin, y);
        y += 10; // line height
      }
      
      doc.save('tailored-resume.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 to-purple-100/50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white/50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-lg border border-[var(--border-primary)]">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Resume History</h1>
            <p className="text-[var(--text-secondary)] mt-1">Previously tailored resumes</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FiArrowLeft className="mr-2" /> Back to Dashboard
          </button>
        </div>

        <div className="bg-[var(--bg-secondary)] shadow-xl rounded-2xl p-6 mb-8 border border-[var(--border-primary)]">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl mr-4">
              <FiFileText className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your Resume History</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-[var(--text-secondary)]">Loading history...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4"></div>
              <h3 className="text-xl font-medium text-[var(--text-primary)]">No resume history found</h3>
              <p className="mt-2 text-[var(--text-secondary)]">Your tailored resumes will appear here</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create Your First Resume
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <HistoryItem 
                  key={item._id} 
                  item={item} 
                  onView={() => setSelectedResume(item)} 
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Resume Preview Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedResume.originalFileName}</h3>
                <button 
                  onClick={() => setSelectedResume(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  &times;
                </button>
              </div>
              <p className="text-indigo-200 mt-1">
                Created: {new Date(selectedResume.createdAt).toLocaleString()}
              </p>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="bg-[var(--bg-primary)] rounded-xl p-6 mb-4 max-h-[50vh] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-[var(--text-primary)]">
                  {selectedResume.generatedContent}
                </pre>
              </div>
            </div>
            
            <div className="p-6 bg-[var(--bg-primary)] flex justify-center space-x-4">
              <button
                onClick={() => downloadPDF(selectedResume.generatedContent)}
                disabled={isDownloading}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                  isDownloading
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  'Download PDF'
                )}
              </button>
              <button
                onClick={() => setSelectedResume(null)}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:opacity-90 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}