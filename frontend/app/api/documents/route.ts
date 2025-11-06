
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory data store (replace with a database in production)
// NOTE: This should be the same data source as in [id]/route.ts.
// For a real app, move this to a shared module or a database.
let documents = [
  { id: '1', title: 'Sample Document 1', description: 'This is a sample.', category: 'case-study', level: 'bsn', price: 10.99, fileUrl: '/documents/sample1.pdf', imageUrl: '/images/sample1.jpg' },
  { id: '2', title: 'Sample Document 2', description: 'This is another sample.', category: 'care-plan', level: 'msn', price: 15.50, fileUrl: '/documents/sample2.pdf', imageUrl: '/images/sample2.jpg' },
];

// GET all documents
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Failed to get documents:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// CREATE a new document
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const level = formData.get('level') as string;
    const price = parseFloat(formData.get('price') as string);
    // In a real app, you would handle file uploads and get URLs
    const file = formData.get('file') as File | null;
    const image = formData.get('image') as File | null;

    if (!title || !description || !category || !level || isNaN(price)) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newDocument = {
      id: uuidv4(),
      title,
      description,
      category,
      level,
      price,
      fileUrl: file ? `/documents/${file.name}` : '', // Placeholder URL
      imageUrl: image ? `/images/${image.name}` : '', // Placeholder URL
    };

    documents.push(newDocument);

    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    console.error('Failed to create document:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
