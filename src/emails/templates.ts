/**
 * Plain HTML email builders.
 *
 * Why not React Email? Resend's `react:` option renders through
 * `@react-email/render`, which is not installed in this project (only
 * `@react-email/components` is). In production that surfaced as
 * "TypeError: b is not a function" inside the Resend SDK, so every inquiry
 * failed after the visitor had already filled out the form. Installing the
 * missing package is not an option here, and hand-built HTML strings are the
 * more durable choice for email anyway: no bundler involvement, no peer
 * dependency drift, and full control over the inline styles that email
 * clients actually respect.
 *
 * The .tsx templates in this folder are kept as a design reference. They are
 * not wired to anything. If `@react-email/render` is ever added, they can be
 * reinstated.
 */

const GOLD = '#c2a36c'
const INK = '#0a0a0a'
const BODY_TEXT = '#3f3f3f'
const MUTED = '#6b6b6b'
const RULE = '#e0ddd8'
const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

const SERVICE_LABELS: Record<string, string> = {
  senior: 'Senior Portraits',
  family: 'Family Portraits',
  other: 'Other',
}

/** Minimal HTML escaping. Every value below comes from a public form. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function shell(inner: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Emily Kathryn Photography</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f6f4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f6f4;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border:1px solid ${RULE};">
<tr><td style="background-color:${INK};padding:28px 32px;text-align:center;">
<div style="font-family:${SANS};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};">Emily Kathryn Photography</div>
</td></tr>
<tr><td style="padding:36px 32px;">${inner}</td></tr>
<tr><td style="border-top:1px solid ${RULE};padding:20px 32px;text-align:center;">
<div style="font-family:${SANS};font-size:11px;color:${MUTED};">Senior and family portraits, South-Central Virginia</div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};width:38%;vertical-align:top;">${esc(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:14px;color:${BODY_TEXT};vertical-align:top;">${esc(value)}</td>
</tr>`
}

export interface InquiryFields {
  name: string
  email: string
  phone?: string
  serviceType: string
  gradYear?: string
  highSchool?: string
  message: string
}

/** Notification to Emily. Reply-to is set to the client on the send call. */
export function renderInquiryNotification(f: InquiryFields): {
  html: string
  text: string
} {
  const service = SERVICE_LABELS[f.serviceType] ?? f.serviceType
  const rows = [
    row('Name', f.name),
    row('Email', f.email),
    f.phone ? row('Phone', f.phone) : '',
    row('Service', service),
    f.gradYear ? row('Graduation Year', f.gradYear) : '',
    f.highSchool ? row('High School', f.highSchool) : '',
  ].join('')

  const inner = `
<h1 style="margin:0 0 6px;font-family:${SERIF};font-size:26px;font-weight:normal;color:${INK};">New ${esc(service)} inquiry</h1>
<div style="width:48px;height:1px;background-color:${GOLD};margin:14px 0 26px;"></div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
<div style="margin-top:28px;">
<div style="font-family:${SANS};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};margin-bottom:10px;">Message</div>
<div style="font-family:${SANS};font-size:14px;line-height:1.65;color:${BODY_TEXT};white-space:pre-wrap;">${esc(f.message)}</div>
</div>
<div style="margin-top:30px;padding-top:20px;border-top:1px solid ${RULE};font-family:${SANS};font-size:13px;color:${MUTED};">
Reply directly to this email to reach ${esc(f.name)}.
</div>`

  const text = [
    `New ${service} inquiry`,
    '',
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone ? `Phone: ${f.phone}` : '',
    `Service: ${service}`,
    f.gradYear ? `Graduation year: ${f.gradYear}` : '',
    f.highSchool ? `High school: ${f.highSchool}` : '',
    '',
    'Message:',
    f.message,
    '',
    `Reply directly to this email to reach ${f.name}.`,
  ]
    .filter(Boolean)
    .join('\n')

  return {
    html: shell(inner, `${f.name} inquired about ${service}`),
    text,
  }
}

/** Auto-responder to the person who inquired. */
export function renderInquiryAutoResponder(input: {
  name: string
  serviceType: string
}): { html: string; text: string } {
  const service = SERVICE_LABELS[input.serviceType] ?? input.serviceType
  const first = input.name.split(' ')[0] || input.name

  const inner = `
<h1 style="margin:0 0 6px;font-family:${SERIF};font-size:26px;font-weight:normal;color:${INK};">Thank you, ${esc(first)}</h1>
<div style="width:48px;height:1px;background-color:${GOLD};margin:14px 0 26px;"></div>
<p style="margin:0 0 18px;font-family:${SANS};font-size:15px;line-height:1.7;color:${BODY_TEXT};">
Your inquiry about ${esc(service.toLowerCase())} came through, and I read every one myself. You can expect a personal reply within 48 hours.
</p>
<p style="margin:0 0 18px;font-family:${SANS};font-size:15px;line-height:1.7;color:${BODY_TEXT};">
When we talk, we will cover the things that actually shape the day: what you are picturing, where we photograph, and what you would like to end up with on your walls.
</p>
<p style="margin:0 0 26px;font-family:${SANS};font-size:15px;line-height:1.7;color:${BODY_TEXT};">
In the meantime, feel free to reply to this email with anything you forgot to mention.
</p>
<div style="padding-top:22px;border-top:1px solid ${RULE};font-family:${SERIF};font-size:17px;color:${INK};">Emily</div>
<div style="font-family:${SANS};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${GOLD};margin-top:6px;">Emily Kathryn Photography</div>`

  const text = `Thank you, ${first}

Your inquiry about ${service.toLowerCase()} came through, and I read every one myself. You can expect a personal reply within 48 hours.

When we talk, we will cover the things that actually shape the day: what you are picturing, where we photograph, and what you would like to end up with on your walls.

In the meantime, feel free to reply to this email with anything you forgot to mention.

Emily
Emily Kathryn Photography`

  return {
    html: shell(inner, 'Your inquiry came through. A personal reply is on the way.'),
    text,
  }
}
