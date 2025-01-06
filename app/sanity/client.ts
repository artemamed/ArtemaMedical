import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "r78z3nyl",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
