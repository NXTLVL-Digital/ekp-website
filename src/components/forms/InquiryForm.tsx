'use client'

import { useActionState, useState } from 'react'
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry'
import { SubmitButton } from './SubmitButton'

const inputStyles =
  'min-h-11 w-full rounded border border-border bg-white px-3 text-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold'

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null
  return (
    <p className="mt-1 text-xs text-red-600" role="alert">
      {errors[0]}
    </p>
  )
}

export function InquiryForm() {
  const initialState: InquiryState = { success: false, message: '' }
  const [state, formAction] = useActionState(submitInquiry, initialState)
  const [serviceType, setServiceType] = useState('senior')

  if (state.success && state.message) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <div className="mb-3 text-4xl" aria-hidden="true">
          &#10003;
        </div>
        <h3 className="mb-2 font-heading text-xl font-semibold text-green-800">
          Inquiry Sent!
        </h3>
        <p className="text-sm text-green-700">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot — hidden from humans, traps bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your Name"
          className={inputStyles}
        />
        <FieldError errors={state.errors?.name} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email Address"
          className={inputStyles}
        />
        <FieldError errors={state.errors?.email} />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          Phone <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          className={inputStyles}
        />
      </div>

      {/* Service Type */}
      <div>
        <label
          htmlFor="serviceType"
          className="mb-1.5 block text-sm font-medium"
        >
          What are you interested in? <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          required
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className={inputStyles}
        >
          <option value="senior">Senior Portraits</option>
          <option value="family">Family Portraits</option>
          <option value="other">Other / Not Sure</option>
        </select>
        <FieldError errors={state.errors?.serviceType} />
      </div>

      {/* Conditional Senior Fields */}
      {serviceType === 'senior' && (
        <>
          <div>
            <label
              htmlFor="gradYear"
              className="mb-1.5 block text-sm font-medium"
            >
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="gradYear"
              name="gradYear"
              required
              placeholder="e.g., 2027"
              className={inputStyles}
            />
            <FieldError errors={state.errors?.gradYear} />
          </div>

          <div>
            <label
              htmlFor="highSchool"
              className="mb-1.5 block text-sm font-medium"
            >
              High School <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="highSchool"
              name="highSchool"
              required
              placeholder="High School Name"
              className={inputStyles}
            />
            <FieldError errors={state.errors?.highSchool} />
          </div>
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Tell Us About Your Dream Session{' '}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="What are you envisioning? Share your ideas, preferred locations, or any questions you have..."
          className={`${inputStyles} py-2.5`}
        />
        <FieldError errors={state.errors?.message} />
      </div>

      {/* Submit */}
      <SubmitButton />

      {/* Status message */}
      {state.message && !state.success && (
        <p className="text-center text-sm text-red-600" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  )
}
