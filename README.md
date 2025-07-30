Resume Tailor - AI-Powered Resume Optimization


Resume Tailor is a cutting-edge web application that uses AI to optimize your resume for specific job descriptions. Upload your resume, provide a job description, and get a tailored resume that matches the job requirements in seconds!

Features
AI-Powered Optimization: Leverages OpenAI's GPT models to tailor your resume

PDF Parsing: Extracts text from uploaded PDF resumes

Secure Authentication: User authentication via Supabase

History Tracking: Saves all your tailored resumes for future reference

PDF Download: Download your tailored resume as a PDF

Responsive Design: Works seamlessly on desktop and mobile devices

Technologies Used
Frontend: Next.js (React), Tailwind CSS

Backend: Next.js API Routes

Database: MongoDB (via Mongoose)

Authentication: Supabase

AI Integration: OpenRouter API

PDF Processing: pdf2json

PDF Generation: jsPDF

Getting Started
Prerequisites
Node.js v18 or higher

MongoDB Atlas account or local MongoDB instance

Supabase account

OpenRouter API key

Installation
Clone the repository:

bash
git clone https://github.com/your-username/resume-tailor.git
cd resume-tailor
Install dependencies:

bash
npm install
Create a .env.local file in the root directory and add your environment variables:

env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
Run the development server:

bash
npm run dev
Open http://localhost:3000 in your browser

Configuration
MongoDB Setup
Create a free MongoDB Atlas cluster at https://www.mongodb.com/atlas

Get your connection string and add it to .env.local

Supabase Setup
Create a Supabase project at https://supabase.io

Enable email authentication

Add your Supabase URL and anon key to .env.local

OpenRouter Setup
Create an account at https://openrouter.ai

Generate an API key

Add it to .env.local