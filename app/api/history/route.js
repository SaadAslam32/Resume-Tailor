import { connectToDatabase } from '@/lib/mongo';
import { ObjectId } from 'mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({ error: 'Missing userId' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const items = await db
      .collection('resumes')
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    // Convert MongoDB ObjectId to string
    const list = items.map((x) => ({
      _id: x._id.toString(),
      originalFileName: x.originalFileName,
      createdAt: x.createdAt,
      generatedContent: x.generatedContent // Include the full content
    }));

    return Response.json({ items: list });
  } catch (error) {
    console.error('History error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}