import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * City Landing Page document schema.
 *
 * Each of the 7 target cities gets its own document with unique SEO copy,
 * an AEO answer snippet, gallery images, testimonials, and a Google Maps
 * search query. Emily can manage all city content directly in Sanity Studio.
 */
export const cityPage = defineType({
  name: 'cityPage',
  title: 'City Landing Page',
  type: 'document',
  description:
    'A landing page for a specific city Emily serves. Each city gets unique copy, photos, and testimonials.',
  fields: [
    defineField({
      name: 'title',
      title: 'City Name',
      type: 'string',
      description: 'The city name (e.g., "Chatham")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Path',
      type: 'slug',
      description:
        'The web address for this city page. Click "Generate" to create it from the city name.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Page Headline',
      type: 'string',
      description:
        'The main headline shown on the page (e.g., "Senior Portraits in Chatham, VA")',
    }),
    defineField({
      name: 'aeoBlock',
      title: 'AEO Answer Snippet',
      type: 'text',
      rows: 3,
      description:
        'The 40-60 word answer targeting "portrait photographer in [City] VA". Editable independently from body copy.',
      validation: (rule) => rule.required().min(100).max(400),
    }),
    defineField({
      name: 'body',
      title: 'Main Copy',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'The unique SEO copy for this city (250-500 words).',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      description: 'SEO meta description for this city page (150-160 chars).',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'galleryImages',
      title: 'City Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Photo',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Photo Description',
              type: 'string',
              description:
                'Describe what is in this photo (helps with Google search and accessibility).',
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description:
                'A short caption shown below the photo. Leave blank to show no caption.',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
      description: 'Assign 8-12 photos for this city page.',
    }),
    defineField({
      name: 'testimonials',
      title: 'City Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'testimonial' }],
        }),
      ],
      description:
        'Pick testimonials for this city. If none are city-specific, choose regional ones.',
    }),
    defineField({
      name: 'testimonialLabel',
      title: 'Testimonial Location Label',
      type: 'string',
      description:
        'Override label (e.g., "South-Central Virginia" for regional fallback). Leave blank to use city name.',
    }),
    defineField({
      name: 'mapQuery',
      title: 'Google Maps Search Query',
      type: 'string',
      description:
        'What to search on Google Maps (e.g., "Chatham, Virginia"). Used for the embedded map.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'galleryImages.0',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled City',
        subtitle: 'City Landing Page',
        media,
      }
    },
  },
})
