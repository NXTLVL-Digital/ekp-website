import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Gallery document schema.
 *
 * Emily can create galleries for Senior Portraits, Family Portraits, or
 * specific locations. Each gallery has a display style choice (Masonry or Grid)
 * and an orderable array of photos with descriptions and optional captions.
 */
export const gallery = defineType({
  name: "gallery",
  title: "Photo Gallery",
  type: "document",
  description:
    "A collection of photos that appears on your website. You can create galleries for Senior Portraits, Family Portraits, or specific locations.",
  fields: [
    defineField({
      name: "title",
      title: "Gallery Name",
      type: "string",
      description:
        'A name for this gallery (e.g., "Senior Portraits 2025" or "Chatham Sessions")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Path",
      type: "slug",
      description:
        'The web address for this gallery. Click "Generate" to create it from the title.',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Gallery Type",
      type: "string",
      description: "What kind of sessions are in this gallery?",
      options: {
        list: [
          { title: "Senior Portraits", value: "senior" },
          { title: "Family Portraits", value: "family" },
          { title: "Location Gallery", value: "location" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayStyle",
      title: "Layout Style",
      type: "string",
      description:
        "How should photos be arranged? Masonry fills space naturally (like Pinterest). Grid keeps all photos the same size.",
      options: {
        list: [
          { title: "Masonry (varied sizes)", value: "masonry" },
          { title: "Uniform Grid (same size)", value: "grid" },
        ],
        layout: "radio",
      },
      initialValue: "masonry",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "Drag and drop to reorder. The first photo is featured most prominently.",
      of: [
        defineArrayMember({
          type: "image",
          title: "Photo",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Photo Description",
              type: "string",
              description:
                'Describe what is in this photo (helps with Google search and accessibility). Example: "Senior girl in blue dress at Smith Mountain Lake"',
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
              description:
                "A short caption shown below the photo. Leave blank to show no caption.",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) =>
        rule.min(1).error("A gallery needs at least one photo"),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description:
        "If this is a location gallery, which city? Used to show photos on city landing pages.",
      options: {
        list: [
          { title: "Chatham", value: "chatham" },
          { title: "Danville", value: "danville" },
          { title: "Lynchburg", value: "lynchburg" },
          { title: "Smith Mountain Lake", value: "smith-mountain-lake" },
          { title: "Forest", value: "forest" },
          { title: "Altavista", value: "altavista" },
          { title: "Evington", value: "evington" },
        ],
      },
      hidden: ({ parent }) => parent?.category !== "location",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "images.0",
      imageCount: "images",
    },
    prepare({ title, category, media, imageCount }) {
      const count = Array.isArray(imageCount) ? imageCount.length : 0;
      return {
        title: title || "Untitled Gallery",
        subtitle: `${category || "Uncategorized"} - ${count} photo${count !== 1 ? "s" : ""}`,
        media,
      };
    },
  },
});
