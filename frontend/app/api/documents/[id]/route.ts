import { NextRequest, NextResponse } from 'next/server'

// This would connect to the same documents array in production
let documents: any[] = []

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const index = documents.findIndex(doc => doc.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }
    
    documents.splice(index, 1)
    return NextResponse.json({ message: 'Document deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
  }
}