import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "jlk8c83m",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});