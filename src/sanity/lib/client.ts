import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Use a placeholder when projectId is missing so the client can be imported
// without throwing. Actual API calls will still fail gracefully (empty results).
export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
});
