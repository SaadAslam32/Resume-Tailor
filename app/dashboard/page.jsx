// app/dashboard/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import ResumePreview from '@/components/ResumePreview';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiFileText, FiUser, FiLogOut, FiStar } from 'react-icons/fi';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push('/auth/login');
        return;
      }
      setUser(data.user);
    };
    getSession();
  }, [router]);

  const handleFileSelected = (file) => {
    setResumeFile(file);
  };

  const processResume = async () => {
    if (!resumeFile) {
      toast.error('Please upload a resume');
      return;
    }
    if (!jobDescription || jobDescription.trim().length < 50) {
      toast.error('Job description must be at least 50 characters');
      return;
    }
    if (!user?.id) {
      toast.error('User not found. Please sign in again.');
      router.push('/auth/login');
      return;
    }

    try {
      setProcessing(true);
      setGeneratedResume(''); // Clear previous result
      
      const formData = new FormData();
      formData.append('file', resumeFile);
      formData.append('jobDescription', jobDescription);
      formData.append('userId', user.id);

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to process resume';
        try {
          const errorData = await response.json();
          if (errorData.error) errorMessage = errorData.error;
          if (errorData.details) errorMessage += `: ${errorData.details}`;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (!result.generatedResume) {
        throw new Error('Server returned empty response');
      }

      setGeneratedResume(result.generatedResume);
      toast.success('Resume tailored successfully!');
    } catch (error) {
      console.error('Processing error:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 to-purple-100/50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)] font-sans">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white/50 dark:from-gray-900 dark:to-gray-800 py-8 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-lg border border-[var(--border-primary)]">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center font-heading">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg mr-3">
                <FiUser className="text-white" />
              </div>
              Welcome, <span className="text-indigo-600 ml-2">{user.email}</span>
            </h1>
            <p className="text-[var(--text-secondary)] mt-1 font-medium">AI-powered resume optimization</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
            className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
          >
            <FiLogOut className="mr-2" /> Sign Out
          </button>
        </div>

        <div className="bg-[var(--bg-secondary)] shadow-xl rounded-2xl p-6 mb-8 border border-[var(--border-primary)]">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl mr-4">
              <FiFileText className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-heading">Tailor Your Resume</h2>
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-bold text-[var(--text-primary)] text-lg font-heading">
              Upload Resume (PDF)
            </label>
            <FileUpload onFileSelected={handleFileSelected} />
            <p className="mt-3 text-sm text-[var(--text-secondary)] text-center italic">
              We support PDF files up to 5MB in size
            </p>
          </div>

          <div className="mb-8">
            <label className="block mb-3 font-bold text-[var(--text-primary)] text-lg font-heading">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description you're applying for..."
              className="w-full h-48 p-4 bg-[var(--bg-primary)] border-2 border-[var(--border-primary)] rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-base text-[var(--text-primary)] font-normal leading-relaxed shadow-inner"
              required
            />
            <p className="mt-2 text-sm text-[var(--text-secondary)] italic">
              Minimum 50 characters required
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={processResume}
              disabled={processing || !resumeFile}
              className={`flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                (processing || !resumeFile) 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl font-heading'
              }`}
            >
              {processing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FiStar className="mr-3 text-xl" /> Tailor My Resume
                </>
              )}
            </button>
          </div>
        </div>

        {generatedResume && (
          <ResumePreview content={generatedResume} />
        )}

        <div className="text-center mt-10">
          <a 
            href="/dashboard/history" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-lg transition group font-heading"
          >
            View Previous Resumes <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
      <ToastContainer 
        position="bottom-right" 
        theme={document.documentElement.getAttribute('data-theme') || 'light'} 
        className="!z-[100]"
        toastClassName="!font-sans"
      />
    </div>
  );
}