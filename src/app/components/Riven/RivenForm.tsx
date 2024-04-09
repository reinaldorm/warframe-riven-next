import React from "react";
import Link from "next/link";
import suggestions from "@/app/suggestions.json";
import { startsWith } from "@/utils";

import styles from "./riven.module.scss";
import type { QueryError } from "./index";

interface RivenFormProps {
  handleSearch: (query: string) => void;
  errorStatus: QueryError;
}

export default function RivenForm({
  handleSearch,
  errorStatus,
}: RivenFormProps) {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [suggestion, setSuggestion] = React.useState("");

  function updateSuggestion() {
    let newSuggestion = suggestions.find((name) => startsWith(name, query));

    if (newSuggestion) {
      newSuggestion =
        query + newSuggestion.slice(query.length, newSuggestion.length);
      setSuggestion(newSuggestion);
    } else {
      setSuggestion("");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (suggestion) {
      handleSearch(suggestion);
    } else {
      handleSearch(query);
    }
  }

  React.useEffect(() => {
    if (query.length > 0) {
      updateSuggestion();
    } else {
      setSuggestion("");
    }
  }, [query]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className={styles.searchForm} action="/" onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <label className={styles.searchSuggestion} htmlFor="riven">
          {suggestion}
        </label>
        <input
          ref={inputRef}
          autoComplete="off"
          className={styles.searchInput}
          placeholder="Riven's name"
          onChange={(e) => setQuery(e.target.value)}
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
      <div className={styles.searchSubtitles}>
        <Link className={styles.searchLink} href={"/"}>
          See top rivens{" "}
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.77644 5.95159L10.9602 6.01052M10.9602 6.01052L11.0191 10.1942M10.9602 6.01052L6.01041 10.9603"
              stroke="#6B6B6B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        {errorStatus.status && (
          <p
            data-level={String(errorStatus.level)}
            className={styles.searchError}
          >
            {errorStatus.description}
          </p>
        )}
      </div>
    </form>
  );
}
