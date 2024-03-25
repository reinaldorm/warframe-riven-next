import React from "react";
import styles from "./riven.module.scss";
import RivenSuggestions from "./RivenSuggestions";
import RivenInput from "./RivenInput";

interface RivenFormProps {
  handleSearch: (query: string) => void;
  errorStatus: QueryError;
}

export default function RivenForm({
  handleSearch,
  errorStatus,
}: RivenFormProps) {
  const [query, setQuery] = React.useState("");

  function updateQuery(newQuery: string) {
    setQuery(newQuery);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(query);
  }

  return (
    <form className={styles.searchForm} action="/" onSubmit={handleSubmit}>
      <RivenInput query={query} updateQuery={updateQuery} />
      <button className={styles.searchButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#fff"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
      {errorStatus.status && (
        <p
          data-level={String(errorStatus.level)}
          className={styles.searchError}
        >
          {errorStatus.htmlDesc}
        </p>
      )}
    </form>
  );
}
