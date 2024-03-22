import React from "react";
import styles from "./riven.module.scss";
import suggestions from "@/utils/suggestions.json";

interface RivenSuggestionsProps {
  query: string;
  handleSearch: (query: string) => void;
}

export default function RivenSuggestions({
  query,
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
