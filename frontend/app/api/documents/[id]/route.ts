import { NextRequest, NextResponse } from 'next/server';

// In-memory data store (replace with a database in production)
let documents = [
  { id: '1', title: 'Sample Document 1', description: 'This is a sample.', category: 'case-study', level: 'bsn', price: 10.99, fileUrl: '/documents/sample1.pdf', imageUrl: '/images/sample1.jpg' },
  { id: '2', title: 'Sample Document 2', description: 'This is another sample.', category: 'care-plan', level: 'msn', price: 15.50, fileUrl: '/documents/sample2.pdf', imageUrl: '/images/sample2.jpg' },
];

// GET a single document by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = documents.find(doc => doc.id === params.id);
    if (!document) {
      return NextResponse.json({ message: 'Document not found' }, { status: 404 });
    }
    return NextResponse.json(document);
  } catch (error) {
    console.error('Failed to get document:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// UPDATE a document by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const level = formData.get('level') as string;
    const price = parseFloat(formData.get('price') as string);

    const docIndex = documents.findIndex(doc => doc.id === params.id);

    if (docIndex === -1) {
      return NextResponse.json({ message: 'Document not found' }, { status: 404 });
    }

    // In a real app, you would handle file uploads here
    // For now, we just update the text fields

    const updatedDocument = {
      ...documents[docIndex],
      title,
      description,
      category,
      level,
      price,
    };

    documents[docIndex] = updatedDocument;

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error('Failed to update document:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a document by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id:string } }
) {
  try {
    const docIndex = documents.findIndex(doc => doc.id === params.id);

    if (docIndex === -1) {
      return NextResponse.json({ message: 'Document not found' }, { status: 404 });
    }

    documents.splice(docIndex, 1);

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Failed to delete document:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
