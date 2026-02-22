'use server'

import { Resend } from 'resend'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'
import { inquirySchema } from '@/lib/inquiry-schema'
import InquiryNotification from '@/emails/InquiryNotification'
import InquiryAutoResponder from '@/emails/InquiryAutoResponder'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export type InquiryState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

const serviceLabels: Record<string, string> = {
  senior: 'Senior Portraits',
  family: 'Family Portraits',
  other: 'Other',
}

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  try {
    // 1. Honeypot check — silently reject bots
    const honeypot = formData.get('website')
    if (honeypot && String(honeypot).length > 0) {
      return { success: true, message: 'Thank you!' }
    }

    // 2. Rate limiting by IP
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown'

    if (!checkRateLimit(ip)) {
      return {
        success: false,
        message:
          'Too many submissions. Please wait a few minutes and try again.',
      }
    }

    // 3. Parse FormData — manually extract fields to avoid $ACTION_ keys (Pitfall 2)
    const data = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      serviceType: String(formData.get('serviceType') ?? ''),
      gradYear: String(formData.get('gradYear') ?? ''),
      highSchool: String(formData.get('highSchool') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    }

    // 4. Zod validation
    const validatedFields = inquirySchema.safeParse(data)

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Please fix the errors below.',
        errors: validatedFields.error.flatten().fieldErrors as Record<
          string,
          string[]
        >,
      }
    }

    const validated = validatedFields.data
    const serviceLabel =
      serviceLabels[validated.serviceType] ?? validated.serviceType

    // 5. Send notification email to Emily
    if (!resend) {
      // Graceful degradation: log during development when no API key
      console.log('[inquiry] RESEND_API_KEY not set — skipping email delivery')
      console.log('[inquiry] Submission data:', {
        name: validated.name,
        email: validated.email,
        serviceType: validated.serviceType,
      })
      return {
        success: true,
        message:
          "Your inquiry has been sent! We'll be in touch within 48 hours.",
      }
    }

    await resend.emails.send({
      from: 'Emily Kathryn Photography <noreply@emilykathryn.com>',
      to: [process.env.NOTIFICATION_EMAIL ?? 'emily@emilykathryn.com'],
      replyTo: validated.email,
      subject: `New ${serviceLabel} inquiry from ${validated.name}`,
      react: InquiryNotification({
        name: validated.name,
        email: validated.email,
        phone: validated.phone || undefined,
        serviceType: validated.serviceType,
        gradYear: validated.gradYear || undefined,
        highSchool: validated.highSchool || undefined,
        message: validated.message,
      }),
    })

    // 6. Schedule auto-responder — wrapped in its own try/catch (Pitfall 7)
    //    Auto-responder is nice-to-have; notification to Emily is critical.
    try {
      await resend.emails.send({
        from: 'Emily Kathryn Photography <hello@emilykathryn.com>',
        to: [validated.email],
        subject: `Thank you for your inquiry, ${validated.name}!`,
        scheduledAt: 'in 10 min',
        react: InquiryAutoResponder({
          name: validated.name,
          serviceType: validated.serviceType,
        }),
      })
    } catch (autoResponderError) {
      console.error(
        '[inquiry] Auto-responder failed (non-critical):',
        autoResponderError
      )
    }

    // 7. Success
    return {
      success: true,
      message:
        "Your inquiry has been sent! We'll be in touch within 48 hours.",
    }
  } catch (error) {
    console.error('[inquiry] Submission failed:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
