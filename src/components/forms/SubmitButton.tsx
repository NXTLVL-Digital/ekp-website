'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="min-h-11 w-full rounded bg-brand-gold px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Sending...' : 'Send Inquiry'}
    </button>
  )
}
