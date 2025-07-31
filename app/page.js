
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative overflow-hidden">

      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        <section className="pt-28 pb-20 px-4 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Transform Your Resume with AI
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            Instantly tailor your resume to match any job description.
            <span className="block mt-2 font-medium">Land more interviews with perfectly optimized resumes.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/login"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-full group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-out"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></span>
             <span className="relative">Get Started - It&apos;s Free</span>
              <svg className="ml-2 w-5 h-5 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>

            <Link
              href="#features"
              className="px-8 py-4 font-medium rounded-full bg-white/10 backdrop-blur-sm border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 px-4 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-16 relative">
              <span className="relative inline-block">
                How It Works
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></span>
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Upload & Describe', desc: 'Upload your resume and paste the job description', icon: '📄' },
                { title: 'AI Tailoring', desc: 'Our AI analyzes and rewrites your resume for the specific role', icon: '🤖' },
                { title: 'Download & Apply', desc: 'Download your perfectly tailored resume and apply with confidence', icon: '🚀' }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform rotate-1 group-hover:rotate-3 transition duration-500"></div>
                  <div className="relative bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-xl h-full transform transition duration-500 group-hover:-translate-y-2">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-[var(--border-primary)] shadow-sm">
            <h3 className="text-2xl font-bold text-center mb-6">Why Choose ResumeTailor.ai?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "AI-powered keyword optimization",
                "ATS-friendly formatting",
                "Industry-specific tailoring",
                "Real-time previews",
                "Unlimited revisions",
                "Secure and private"
              ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-primary)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}