import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'documents.json')

async function getDocuments() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

async function saveDocuments(documents: any[]) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
  await fs.writeFile(dataFilePath, JSON.stringify(documents, null, 2))
}

// GET all documents
export async function GET() {
  const documents = await getDocuments()
  return NextResponse.json(documents)
}

// POST a new document
export async function POST(request: Request) {
  try {
    const documents = await getDocuments()
    const formData = await request.formData()

    const newDocument = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      level: formData.get('level') as string,
      price: parseFloat(formData.get('price') as string),
      status: 'published' as const,
      createdAt: new Date().toISOString(),
      fileName: (formData.get('file') as File)?.name || '',
      imageUrl: (formData.get('image') as File)?.name ? `/uploads/${(formData.get('image') as File).name}` : '',
    }

    // In a real app, you would save the files to a storage service (e.g., S3, or public/uploads)
    // For this example, we are just using the file names.

    documents.push(newDocument)
    await saveDocuments(documents)

    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    console.error('Failed to create document:', error)
    return NextResponse.json({ message: 'Failed to create document' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const documents = await getDocuments()
    const index = documents.findIndex(doc => doc.id === data.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }
    documents[index] = { ...documents[index], ...data }
    await saveDocuments(documents)
    return NextResponse.json(documents[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
  }
}
