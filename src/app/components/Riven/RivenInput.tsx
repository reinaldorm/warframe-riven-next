import styles from "./riven.module.scss";
import suggestions from "@/app/suggestions.json";
import { startsWith } from "@/utils";
import React from "react";

interface RivenInputProps {
  query: string;
  updateQuery: (query: string) => void;
}

export default function RivenInput({ query, updateQuery }: RivenInputProps) {
  const [suggestion, setSuggestion] = React.useState("");

  function updateSuggestion() {
    let newSuggestion = suggestions.find((name) => startsWith(name, query));

    if (newSuggestion) {
      newSuggestion =
        query[0] === query.toLowerCase()[0]
          ? newSuggestion[0].toLowerCase() + newSuggestion.slice(1)
          : newSuggestion;
      setSuggestion(newSuggestion);
    } else {
      setSuggestion("");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateQuery(e.target.value);
  }

  React.useEffect(() => {
    if (query.length > 0) {
      updateSuggestion();
    } else {
      setSuggestion("");
    }
  }, [query]);

  return (
    <div className={styles.searchBox}>
      <label className={styles.searchSuggestion} htmlFor="riven">
        {suggestion}
      </label>
      <input
        autoComplete="off"
        className={styles.searchInput}
        placeholder="Riven's name"
        onChange={handleChange}
        value={query}
        id="riven"
        name="riven"
      />
      <button className={styles.searchButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2846 11.3599L13.6 13.5999M12.8533 7.62657C12.8533 10.5132 10.5133 12.8532 7.62667 12.8532C4.74006 12.8532 2.4 10.5132 2.4 7.62657C2.4 4.73996 4.74006 2.3999 7.62667 2.3999C10.5133 2.3999 12.8533 4.73996 12.8533 7.62657Z"
            stroke="#585858"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
