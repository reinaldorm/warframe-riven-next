import React from "react";
import styles from "./riven.module.scss";
import RivenInput from "./RivenInput";
import Link from "next/link";

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
            {errorStatus.htmlDesc}
          </p>
        )}
      </div>
    </form>
  );
}
