"use client";

import React from "react";
import styles from "./riven.module.scss";
import RivenTable from "./RivenTable";
import RivenForm from "./RivenForm";
import { createPortal } from "react-dom";

export default function Riven() {
  const [riven, setRiven] = React.useState<RivenInfo | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState<QueryError>({
    status: false,
    htmlDesc: "",
    level: 0,
  });

  function updateErrorStatus(status: false): void;
  function updateErrorStatus(
    status: true,
    htmlDesc: string,
    level: ErrorLevel
  ): void;
  function updateErrorStatus(
    status: boolean,
    htmlDesc?: string,
    level?: ErrorLevel
  ) {
    if (status && htmlDesc && level !== undefined) {
      setErrorStatus({ status: true, htmlDesc, level });
    } else {
      setErrorStatus({ status: false, htmlDesc: "", level: 0 });
    }

    setLoading(false);
  }

  function updateRiven(data: RivenResponse | null) {
    if (data === null) {
      setRiven(data);
      return;
    }

    const rivensData = Object.values(data);

    if (!rivensData.length) {
      updateErrorStatus(true, "No riven data found, try again.", 1);
      return;
    }

    setRiven(rivensData[0]);
    setLoading(false);
  }

  async function handleSearch(query: string) {
    updateErrorStatus(false);
    if (!query) {
      updateErrorStatus(true, "May god free you of your dumbness.", 0);
      return;
    }
    setLoading(true);

    const response = await fetch(
      `https://api.warframestat.us/pc/rivens/search/${query.toLowerCase()}`
    );

    if (!response.ok) {
      updateErrorStatus(true, "Bad request, please try again.", 2);
      return;
    }

    const data = (await response.json()) as RivenResponse;
    updateRiven(data);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className={styles.title}>
            {riven ? "Last Week Statistc" : "Insert the weapon's name"}
          </h1>
          {riven ? (
            <RivenTable riven={riven} updateRiven={updateRiven} />
          ) : (
            <RivenForm errorStatus={errorStatus} handleSearch={handleSearch} />
          )}
        </>
      )}
    </div>
  );
}
