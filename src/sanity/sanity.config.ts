import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "emilykathryn-photography",
  title: "Emily Kathryn Photography",

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
