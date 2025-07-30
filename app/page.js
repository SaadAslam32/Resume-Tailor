import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-indigo-700">ResumeTailor.ai</div>
        <Link 
          href="/auth/login" 
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Sign In
        </Link>
      </nav>

      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
          AI-Powered Resume Tailoring
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Transform your resume in seconds to perfectly match any job description. 
          Powered by advanced AI for maximum impact.
        </p>
        
        <Link 
          href="/auth/login" 
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
        >
          Get Started - It's Free
        </Link>
      </section>

      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {title: 'Upload & Describe', desc: 'Upload your resume and paste the job description'},
              {title: 'AI Tailoring', desc: 'Our AI analyzes and rewrites your resume for the specific role'},
              {title: 'Download & Apply', desc: 'Download your perfectly tailored resume and apply with confidence'}
            ].map((step, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">{i+1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} ResumeTailor.ai - AI-powered resume optimization</p>
      </footer>
    </div>
  );
}