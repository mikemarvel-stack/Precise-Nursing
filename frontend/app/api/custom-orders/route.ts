import { NextRequest, NextResponse } from 'next/server'

let customOrders: any[] = [
  {
    id: '1',
    title: 'Advanced Cardiac Care Nursing Assignment',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    subject: 'Cardiac Nursing',
    category: 'nursing-assignment',
    nursingLevel: 'msn',
    pages: 8,
    deadline: '2024-02-15',
    description: 'Need a comprehensive assignment on advanced cardiac care protocols and patient management strategies.',
    instructions: 'Please include recent research and evidence-based practices.',
    estimatedPrice: 120,
    status: 'pending',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Pediatric Case Study Analysis',
    customerName: 'Mike Chen',
    customerEmail: 'mike.chen@email.com',
    subject: 'Pediatric Nursing',
    category: 'case-study',
    nursingLevel: 'bsn',
    pages: 5,
    deadline: '2024-02-10',
    description: 'Case study analysis for a pediatric patient with respiratory complications.',
    instructions: 'Focus on nursing interventions and family-centered care.',
    estimatedPrice: 75,
    status: 'in-progress',
    createdAt: '2024-01-18T14:30:00Z'
  }
]

export async function GET() {
  return NextResponse.json(customOrders)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newOrder = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    customOrders.push(newOrder)
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}