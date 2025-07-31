
'use client';
import { jsPDF } from 'jspdf';
import { FiDownload } from 'react-icons/fi';
import { useState } from 'react';

export default function ResumePreview({ content }) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const downloadPDF = () => {
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

  return (
    <div className="mt-8 bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 border border-[var(--border-primary)] transition-all hover:shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Your Tailored Resume
        </h3>
        
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
            isDownloading
              ? 'bg-gray-300 text-gray-500'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg'
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
            <>
              <FiDownload className="mr-2 text-lg" /> Download PDF
            </>
          )}
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-50/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-[var(--border-primary)] rounded-xl p-6 mb-4 max-h-[500px] overflow-y-auto shadow-inner">
        <pre className="whitespace-pre-wrap font-sans text-[var(--text-primary)] text-base leading-relaxed">
          {content}
        </pre>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-yellow-700 dark:text-yellow-300 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Review your resume and make any final adjustments before downloading. The AI has tailored your content based on the job description, but personal review is recommended.</span>
        </p>
      </div>
    </div>
  );
}