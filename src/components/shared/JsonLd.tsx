import type { Thing, WithContext } from 'schema-dts'

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>
}

/**
 * Generic typed JSON-LD structured data renderer. Uses schema-dts for compile-time
 * type safety with zero runtime cost -- just a script tag rendered server-side.
 *
 * Follows the Next.js App Router recommended pattern (NOT react-schemaorg).
 *
 * CRITICAL: The JSON string replaces `<` with `\u003c` to prevent XSS via
 * script injection in the JSON-LD payload.
 *
 * @example
 * ```tsx
 * import type { LocalBusiness, WithContext } from 'schema-dts'
 *
 * const jsonLd: WithContext<LocalBusiness> = {
 *   '@context': 'https://schema.org',
 *   '@type': 'ProfessionalService',
 *   name: 'Emily Kathryn Photography',
 * }
 *
 * <JsonLd data={jsonLd} />
 * ```
 */
export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
