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
    let firstValidSuggestion = suggestions.filter((name) =>
      startsWith(name, query)
    )[0];

    if (!(query[0] === query[0].toUpperCase())) {
      firstValidSuggestion = firstValidSuggestion[0].toLowerCase() + firstValidSuggestion.slice(1)
    }

    setSuggestion(firstValidSuggestion);
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
    </div>
  );
}
