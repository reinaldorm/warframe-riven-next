import React from "react";
import styles from "./riven.module.scss";

interface RivenSuggestionsProps {
  query: string;
  suggestions: Suggestion[];
}

export default function RivenSuggestions({
  query,
  suggestions,
}: RivenSuggestionsProps) {
  return (
    <ul className={styles.searchSuggestions}>
      {suggestions
        .filter((name) => name.toLowerCase().startsWith(query))
        .map((name) => (
          <li key={name + String(Math.random())}>{name}</li>
        ))}
    </ul>
  );
}
