import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * About Page singleton schema.
 *
 * Controls all editable content on Emily's About page — her headshot,
 * bio paragraphs, and the three philosophy principles. Only one document
 * of this type should ever exist (enforced by __experimental_actions).
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  description:
    "Edit your About page — headshot, bio, and philosophy. Only one of these exists.",
  fields: [
    defineField({
      name: "headshot",
      title: "Your Photo",
      type: "image",
      description:
        "Your portrait photo shown on the About page (tall/portrait orientation works best).",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Photo Description",
          type: "string",
          description:
            'Describe the photo for accessibility (e.g., "Emily Kathryn, portrait photographer in South-Central Virginia")',
          initialValue: "Emily Kathryn — portrait photographer in South-Central Virginia",
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Your Story",
      type: "array",
      description:
        "The main paragraphs on your About page. Write naturally — this is where clients get to know you.",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required().min(1).error("Bio is required"),
    }),
    defineField({
      name: "philosophyHeading",
      title: "Philosophy Section Heading",
      type: "string",
      description: 'The heading above your three beliefs (default: "What I Believe")',
      initialValue: "What I Believe",
    }),
    defineField({
      name: "philosophyPrinciples",
      title: "Your Three Beliefs",
      type: "array",
      description:
        "The three numbered principles in the dark section. Keep each one concise and true to your voice.",
      of: [
        defineArrayMember({
          type: "object",
          name: "principle",
          title: "Principle",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              description: 'Display number (e.g., "01", "02", "03")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'Short heading (e.g., "Your Story Matters")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Description",
              type: "text",
              rows: 3,
              description: "2-3 sentences expanding on this belief.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { number: "number", title: "title" },
            prepare({ number, title }) {
              return { title: `${number} — ${title}` };
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.min(1).max(6).error("Add between 1 and 6 principles"),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      description: 'Heading above the contact call-to-action at the bottom of the page.',
      initialValue: "Let's Create Something Beautiful Together",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body Text",
      type: "text",
      rows: 3,
      description: "1-2 sentences inviting visitors to get in touch.",
      initialValue:
        "I would love to hear about your vision — whether it is a milestone senior session or timeless family portraits. Let's start the conversation.",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "string",
      description:
        "What shows up in Google search results for this page (150-160 characters).",
      initialValue:
        "Meet Emily Kathryn — a portrait photographer in South-Central Virginia who believes every session should feel like a magazine shoot.",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { media: "headshot" },
    prepare({ media }) {
      return {
        title: "About Page",
        subtitle: "Emily's bio, headshot, and philosophy",
        media,
      };
    },
  },
});
