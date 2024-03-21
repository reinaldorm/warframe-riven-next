import React from "react";
import styles from "./riven.module.scss";

interface RivenSuggestionsProps {
  query: string;
  suggestions: Suggestion[];
  handleSearch: (query: string) => void;
}

export default function RivenSuggestions({
  query,
  suggestions,
  handleSearch,
}: RivenSuggestionsProps) {
  return query.length >= 2 ? (
    <ul className={styles.searchSuggestions}>
      {suggestions
        .filter((name) => name.toLowerCase().startsWith(query))
        .map((name) => (
          <li
            aria-label="search for suggestion"
            onClick={() => handleSearch(name)}
            key={name + String(Math.random())}
          >
            {name}
          </li>
        ))}
    </ul>
  ) : (
    <></>
  );
}
