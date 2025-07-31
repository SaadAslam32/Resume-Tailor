// app/auth/login/page.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    
    const storedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(storedTheme);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${baseUrl}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success('Magic link sent! Check your email', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: theme,
        className: '!mt-[20vh]' // Add vertical offset
      });

    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: "top-center",
        theme: theme,
        className: '!mt-[20vh]' // Add vertical offset
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 to-purple-100/50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <FiMail className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            ResumeTailor.ai
          </h1>
          <p className="text-[var(--text-secondary)]">AI-powered resume optimization</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl shadow-xl p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Welcome Back</h2>
            <p className="text-[var(--text-secondary)]">Enter your email to sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-[var(--text-secondary)]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending magic link...
                </span>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[var(--text-secondary)]">
           <p>{"Don't have an account? You'll be automatically registered"}</p>
            <p className="mt-4">
              <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition">
                <FiArrowLeft className="mr-1" /> Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Toast Container with vertical centering */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
        className="!z-[100]"
      />
    </div>
  );
}