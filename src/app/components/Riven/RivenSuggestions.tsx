import React from "react";
import styles from "./riven.module.scss";
import suggestions from "@/app/suggestions.json";

interface RivenSuggestionsProps {
  query: string;
  handleSearch: (query: string) => void;
}

function startsWith(str: string, sub: string) {
  return str.substring(0, sub.length).toLowerCase() === sub.toLowerCase();
}

export default function RivenSuggestions({
  query,
  handleSearch,
}: RivenSuggestionsProps) {
  return (
    <ul className={styles.searchSuggestions}>
      {query.length >= 1 ? (
        suggestions
          .filter((name) => startsWith(name, query))
          .map((name) => (
            <li
              aria-label="search for suggestion"
              onClick={() => handleSearch(name)}
              key={name + String(Math.random())}
            >
              {name}
            </li>
          ))
      ) : (
        <></>
      )}
    </ul>
  );
}
