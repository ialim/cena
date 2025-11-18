import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
      process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
      "http://localhost:3000/studio",
  },
});
