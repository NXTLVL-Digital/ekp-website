import { defineType, defineField } from "sanity";

/**
 * Reusable galleryImage object type.
 * Used in schemas OTHER than the gallery document that need to reference
 * individual images with alt text and captions (e.g., testimonials, blog posts).
 *
 * The gallery document's images array uses inline image fields directly
 * for better Sanity Studio drag-and-drop UX.
 */
export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Photo Description",
      type: "string",
      description:
        "Describe what is in this photo -- helps with Google search and accessibility",
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description:
        "A short caption shown below the photo. Leave blank to show no caption.",
    }),
  ],
  preview: {
    select: {
      alt: "alt",
      media: "image",
    },
    prepare({ alt, media }) {
      return {
        title: alt || "No description",
        media,
      };
    },
  },
});
