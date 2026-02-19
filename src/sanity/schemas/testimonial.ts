import { defineType, defineField } from "sanity";

/**
 * Testimonial document schema.
 *
 * Client testimonials with an optional photo. Emily can mark testimonials
 * as featured to show them on the homepage.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Client Testimonial",
  type: "document",
  description:
    "A review or kind words from a past client. Featured testimonials appear on the homepage.",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      description: "The client's first name (or full name if they prefer)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "What They Said",
      type: "text",
      rows: 4,
      description:
        "Paste the client's review or testimonial here. Keep it authentic!",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "service",
      title: "Session Type",
      type: "string",
      description: "What kind of session did this client book?",
      options: {
        list: [
          { title: "Senior Portraits", value: "senior" },
          { title: "Family Portraits", value: "family" },
          { title: "General", value: "general" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "image",
      title: "Client Photo (optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "A photo of the client (shown next to their quote). Leave blank if not available.",
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage?",
      type: "boolean",
      description:
        "Turn this on to feature this testimonial on the homepage. You can feature as many as you like.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: "name",
      quote: "quote",
      media: "image",
    },
    prepare({ name, quote, media }) {
      const truncated = quote
        ? quote.length > 60
          ? `${quote.slice(0, 60)}...`
          : quote
        : "No quote";
      return {
        title: name || "Unknown Client",
        subtitle: truncated,
        media,
      };
    },
  },
});
