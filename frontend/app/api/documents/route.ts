import { NextRequest, NextResponse } from 'next/server'

let documents: any[] = [
  {
    id: '1',
    title: 'Comprehensive Nursing Care Plan for Diabetes Management',
    description: 'A detailed care plan covering assessment, diagnosis, planning, implementation, and evaluation for diabetic patients.',
    category: 'care-plan',
    level: 'bsn',
    price: 24.99,
    fileName: 'diabetes-care-plan.pdf',
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Pediatric Case Study: Respiratory Distress Syndrome',
    description: 'In-depth case study analysis of RDS in premature infants with nursing interventions.',
    category: 'case-study',
    level: 'rn',
    price: 19.99,
    fileName: 'pediatric-rds-case.pdf',
    status: 'published',
    createdAt: '2024-01-10T14:30:00Z'
  }
]

export async function GET() {
  return NextResponse.json(documents)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newDoc = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    documents.push(newDoc)
    return NextResponse.json(newDoc, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const index = documents.findIndex(doc => doc.id === data.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }
    documents[index] = { ...documents[index], ...data }
    return NextResponse.json(documents[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
  }
}