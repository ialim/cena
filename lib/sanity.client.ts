import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId || !dataset) {
  console.warn(
    "Sanity project credentials are missing. Please set SANITY_PROJECT_ID and SANITY_DATASET."
  );
}

export const sanity = createClient({
  projectId: projectId || "",
  dataset: dataset || "",
  apiVersion: process.env.SANITY_API_VERSION || "2023-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_READ_TOKEN,
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
      process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
      "http://localhost:3000",
  },
});
