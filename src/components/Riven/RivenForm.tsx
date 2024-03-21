import React from "react";
import styles from "./riven.module.scss";
import getSuggestions from "@/actions/getSuggestions";
import RivenSuggestions from "./RivenSuggestions";

interface RivenFormProps {
  handleSearch: (query: string) => void;
  errorStatus: QueryError;
}

export default function RivenForm({
  handleSearch,
  errorStatus,
}: RivenFormProps) {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;
    setQuery(newQuery);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(query);
  }

  React.useEffect(() => {
    async function getSuggestionsFromServer() {
      const suggestionsResponse = await getSuggestions();
      setSuggestions(suggestionsResponse);
    }

    getSuggestionsFromServer();
  }, []);

  return (
    <form className={styles.searchForm} action="/" onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          placeholder="Riven's name"
          onChange={handleChange}
          value={query}
          id="riven"
          name="riven"
        />

        <RivenSuggestions
          query={query}
          suggestions={suggestions}
          handleSearch={handleSearch}
        />
      </div>
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
