'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="editorial-label min-h-11 w-full border border-foreground bg-foreground px-6 py-4 text-white transition-colors duration-300 hover:border-brand-gold hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Sending...' : 'Send Inquiry'}
    </button>
  )
}
