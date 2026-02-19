import { defineType, defineField } from "sanity";

/**
 * Scarcity cue document schema.
 *
 * Time-sensitive availability messages that Emily can toggle on/off.
 * Only one should be active at a time. Messages can optionally auto-hide
 * after a specified date.
 */
export const scarcityCue = defineType({
  name: "scarcityCue",
  title: "Availability Message",
  type: "document",
  description:
    'A short message about limited availability (e.g., "Only 5 Spring 2026 Senior Slots Remaining"). Only one should be active at a time.',
  fields: [
    defineField({
      name: "message",
      title: "Message",
      type: "string",
      description:
        'The message visitors will see, e.g., "Only 5 Spring 2026 Senior Slots Remaining"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Currently Showing?",
      type: "boolean",
      description:
        "Turn this on to show this message on the website. Only one should be active at a time.",
      initialValue: false,
    }),
    defineField({
      name: "expiresAt",
      title: "Auto-Hide Date (optional)",
      type: "datetime",
      description:
        "If set, this message will automatically stop showing after this date. Leave blank to show it until you turn it off manually.",
    }),
  ],
  preview: {
    select: {
      message: "message",
      isActive: "isActive",
    },
    prepare({ message, isActive }) {
      return {
        title: message || "No message",
        subtitle: isActive ? "Active -- showing on site" : "Inactive -- hidden",
      };
    },
  },
});
