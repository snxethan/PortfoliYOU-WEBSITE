import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { RATE_LIMIT } from '../../components/constants'

const rateLimitMap = new Map<string, number>()

// Validate required environment variables
const validateEnvVars = () => {
  const required = ['GMAIL_USER', 'GMAIL_PASS', 'RECEIVER_EMAIL']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Clean up old entries periodically to prevent memory leaks
const cleanupRateLimit = () => {
  const now = Date.now()
  
  for (const [ip, timestamp] of rateLimitMap.entries()) {
    if (now - timestamp > RATE_LIMIT.CLEANUP_THRESHOLD) {
      rateLimitMap.delete(ip)
    }
  }
}

export async function POST(req: Request) {
  try {
    validateEnvVars()
  } catch (error) {
    console.error('Environment validation failed:', error)
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    )
  }

  // Periodic cleanup
  if (Math.random() < 0.1) { // 10% chance to run cleanup
    cleanupRateLimit()
  }

  const ip = req.headers.get('x-forwarded-for') || 'local'
  const now = Date.now()
  const lastSent = rateLimitMap.get(ip) || 0

  if (now - lastSent < RATE_LIMIT.REQUEST_TIMEOUT) {
    return NextResponse.json(
      { message: 'You are sending messages too quickly. Please wait.' },
      { status: 429 }
    )
  }

  rateLimitMap.set(ip, now)

  const body = await req.json().catch(() => null)
  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    )
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: body.email,
      to: process.env.RECEIVER_EMAIL,
      subject: `Portfoli-YOU Contact: ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    })

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
