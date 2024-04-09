"use client";

import React from "react";
import RivenTable from "./RivenTable";
import RivenForm from "./RivenForm";
import RivenInfo from "./RivenInfo";
import RivenTitle from "./RivenTitle";

import styles from "./riven.module.scss";

export interface QueryError {
  status: boolean;
  description: string;
  level: 0 | 1 | 2;
}

export default function Riven() {
  const [riven, setRiven] = React.useState<RivenData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState<QueryError>({
    status: false,
    description: "",
    level: 0,
  });

  function updateErrorStatus({ status, description, level }: QueryError) {
    if (status && description && level !== undefined) {
      setErrorStatus({ status: true, description, level });
    } else {
      setErrorStatus({ status: false, description: "", level: 0 });
    }

    setLoading(false);
  }

  function updateRiven(data: RivenCollection | null) {
    if (data === null) {
      setRiven(data);
      return;
    }

    const rivensData = Object.values(data);

    if (!rivensData.length) {
      updateErrorStatus({
        status: true,
        description: "No Riven found",
        level: 1,
      });
      return;
    }

    setRiven(rivensData[0]);
    setLoading(false);
  }

  async function handleSearch(query: string) {
    updateErrorStatus({ status: false, description: "", level: 0 });
    if (!query) {
      updateErrorStatus({
        status: true,
        description: "Empty Input",
        level: 0,
      });
      return;
    }
    setLoading(true);

    const response = await fetch(
      `https://api.warframestat.us/pc/rivens/search/${query.toLowerCase()}`
    );

    if (!response.ok) {
      updateErrorStatus({
        status: true,
        description: "Please try again",
        level: 2,
      });
      return;
    }

    const data = (await response.json()) as RivenCollection;
    updateRiven(data);
  }

  return (
    <div className={styles.rivenBox} data-loading={loading}>
      {loading && (
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={styles.rivenHeader}>
        <RivenTitle riven={riven} />
        <RivenInfo />
      </div>
      {riven ? (
        <RivenTable riven={riven} updateRiven={updateRiven} />
      ) : (
        <RivenForm errorStatus={errorStatus} handleSearch={handleSearch} />
      )}
    </div>
  );
}
