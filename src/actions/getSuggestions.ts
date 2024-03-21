"use server";

import suggestions from "./suggestions.json";

export default async function getSuggestions() {
  return [...suggestions];
}
