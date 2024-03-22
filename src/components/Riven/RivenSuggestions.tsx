import React from "react";
import styles from "./riven.module.scss";
import suggestions from "@/utils/suggestions.json";

interface RivenSuggestionsProps {
  query: string;
  handleSearch: (query: string) => void;
}

function startsWith(str: string, substr: string) {
  if (str.toLowerCase().substring(0, substr.length) === substr.toLowerCase()) {
    return true;
  } else return false;
}

export default function RivenSuggestions({
  query,
  handleSearch,
}: RivenSuggestionsProps) {
  return (
    <ul className={styles.searchSuggestions}>
      {query.length >= 2 ? (
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
