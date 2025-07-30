import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import PDFParser from 'pdf2json';

export const config = {
  api: { bodyParser: false },
};

export async function POST(request) {
  try {
    console.log('📥 Incoming request received');

    const formData = await request.formData();
    const file = formData.get('file');
    const jobDescription = formData.get('jobDescription');
    const userId = formData.get('userId');

    // Validate inputs
    if (!file || !jobDescription || !userId) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'Ensure file, job description, and user ID are provided'
      }, { status: 400 });
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        error: 'File too large',
        details: `Maximum allowed size is 5MB, got ${(file.size / 1024 / 1024).toFixed(2)}MB`
      }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({
        error: 'Invalid file type',
        details: 'Only PDF files are supported'
      }, { status: 400 });
    }

    // Parse PDF content
    let resumeText = '';
    try {
      const buffer = Buffer.from(await file.arrayBuffer());

      const pdfParser = new PDFParser();
      resumeText = await new Promise((resolve, reject) => {
        let text = '';

        pdfParser.on('pdfParser_dataError', (errData) => {
          console.error('PDFParser error:', errData);
          reject(new Error('Failed to parse PDF'));
        });

        pdfParser.on('pdfParser_dataReady', () => {
          pdfParser.data.Pages.forEach(page => {
            page.Texts.forEach(textItem => {
              text += decodeURIComponent(textItem.R[0].T) + ' ';
            });
            text += '\n\n';
          });
          resolve(text);
        });

        pdfParser.parseBuffer(buffer);
      });

    } catch (err) {
      console.error('❌ PDF extraction failed:', err);
      return NextResponse.json({
        error: 'PDF extraction failed',
        details: 'The file might be encrypted, image-based, or corrupted.'
      }, { status: 400 });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json({
        error: 'Resume content too short',
        details: 'PDF might be empty, image-only, or invalid.'
      }, { status: 400 });
    }

    console.log('📄 Resume text extracted successfully');

    const prompt = `You are an expert resume writer. Tailor the following resume for this job description:

JOB DESCRIPTION:
${jobDescription}

RESUME CONTENT:
${resumeText}

Instructions:
1. Match skills and experiences to job requirements
2. Use keywords from the job description
3. Maintain original resume structure
4. Keep professional tone
5. Output only the tailored resume content, no explanations
6. Keep the content concise and relevant

Tailored Resume:`;

    // OpenRouter API
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    let generatedResume = '';
    try {
      const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'resume-app'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a professional resume writer.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json();
        console.error('❌ OpenRouter AI error:', errorData);
        return NextResponse.json({
          error: 'AI request failed',
          details: errorData.error?.message || 'Unexpected error from OpenRouter'
        }, { status: 500 });
      }

      const aiData = await aiResponse.json();
      generatedResume = aiData.choices[0]?.message?.content?.trim() || '';
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        return NextResponse.json({
          error: 'OpenRouter timeout',
          details: 'Processing took too long. Try with a smaller file or shorter description.'
        }, { status: 504 });
      }
      console.error('❌ AI fetch error:', err);
      return NextResponse.json({
        error: 'Unexpected AI processing error',
        details: err.message
      }, { status: 500 });
    }

    if (!generatedResume) {
      return NextResponse.json({
        error: 'No resume returned',
        details: 'AI returned empty content'
      }, { status: 500 });
    }

    // Save to MongoDB
    let result;
    try {
      const db = await connectToDatabase();
      result = await db.collection('resumes').insertOne({
        userId,
        originalFileName: file.name,
        jobDescription: jobDescription.slice(0, 1000),
        generatedContent: generatedResume,
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error('❌ DB insert error:', dbError);
      return NextResponse.json({
        error: 'Database save failed',
        details: dbError.message
      }, { status: 500 });
    }

    return NextResponse.json({
      generatedResume,
      resumeId: result.insertedId.toString()
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message || 'Something went wrong'
    }, { status: 500 });
  }
}