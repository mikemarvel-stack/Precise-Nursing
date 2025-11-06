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

// GET a single document
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const documents = await getDocuments()
  const document = documents.find(doc => doc.id === params.id)
  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }
  return NextResponse.json(document)
}

// PUT (update) a document
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData()
    const documents = await getDocuments()
    const index = documents.findIndex(doc => doc.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const updatedDocument = {
      ...documents[index],
      title: formData.get('title') as string || documents[index].title,
      description: formData.get('description') as string || documents[index].description,
      category: formData.get('category') as string || documents[index].category,
      level: formData.get('level') as string || documents[index].level,
      price: parseFloat(formData.get('price') as string) || documents[index].price,
      status: formData.get('status') as 'published' | 'draft' || documents[index].status,
    };

    // In a real app, you would handle file updates here

    documents[index] = updatedDocument
    await saveDocuments(documents)

    return NextResponse.json(updatedDocument)
  } catch (error) {
    console.error('Failed to update document:', error)
    return NextResponse.json({ message: 'Failed to update document' }, { status: 500 })
  }
}

// DELETE a document
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    let documents = await getDocuments()
    const initialLength = documents.length
    documents = documents.filter(doc => doc.id !== params.id)

    if (documents.length === initialLength) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    await saveDocuments(documents)
    return NextResponse.json({ message: 'Document deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete document:', error)
    return NextResponse.json({ message: 'Failed to delete document' }, { status: 500 })
  }
}
