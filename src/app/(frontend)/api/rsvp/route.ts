const error = (message: string, status = 400) => Response.json({ ok: false, message }, { status })

export async function POST(request: Request) {
  let body: {
    name?: unknown
    email?: unknown
    welcome?: unknown
    wedding?: unknown
    brunch?: unknown
    notes?: unknown
  }

  try {
    body = await request.json()
  } catch {
    return error('We could not read that RSVP.')
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const notes = typeof body.notes === 'string' ? body.notes.trim() : ''

  if (name.length < 2 || name.length > 120) {
    return error('Please enter your name.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return error('Please enter a valid email address.')
  }
  if (notes.length > 500) {
    return error('Please keep your note under 500 characters.')
  }

  const welcome = body.welcome === true
  const wedding = body.wedding === true
  const brunch = body.brunch === true

  const sheetEndpoint = process.env.GOOGLE_APPS_SCRIPT_URL
  if (!sheetEndpoint) {
    return error('RSVP destination is not configured yet. Please let Katie or Ionel know.', 503)
  }

  try {
    const sheetResponse = await fetch(sheetEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'submit',
        name,
        email,
        welcome,
        wedding,
        brunch,
        notes,
        submittedAt: new Date().toISOString(),
      }),
      cache: 'no-store',
    })
    if (!sheetResponse.ok) {
      return error('We could not save your RSVP. Please try again in a moment.', 502)
    }
  } catch {
    return error('We could not save your RSVP. Please try again in a moment.', 502)
  }

  return Response.json({ ok: true })
}
