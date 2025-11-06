import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (data.username === 'admin' && data.password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@precisenursing.com',
          role: { type: 'admin' }
        },
        token: 'admin-token-123'
      })
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}