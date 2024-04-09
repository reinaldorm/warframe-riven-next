import React from "react";
import RivenRow from "./RivenRow";

import styles from "./riven.module.scss";

interface RivenTableProps {
  riven: RivenData;
  updateRiven: (data: RivenCollection | null) => void;
}

export default function RivenTable({ riven, updateRiven }: RivenTableProps) {
  return (
    <div>
      <table className={styles.rivenTable}>
        <thead>
          <tr>
            <th className={styles.rivenTableHead}>
              {riven.rerolled?.compatibility ||
                riven.unrolled?.compatibility ||
                "N/A"}
            </th>
            <th>Average</th>
            <th>Deviation</th>
            <th>Max</th>
            <th>Min</th>
            <th>POP</th>
            <th>Media</th>
          </tr>
        </thead>
        <tbody>
          <RivenRow label="Rerolled" info={riven.rerolled} />
          <RivenRow label="Unrolled" info={riven.unrolled} />
        </tbody>
      </table>
      <div className={styles.rivenTableSubtitles}>
        <button onClick={() => updateRiven(null)} className={styles.rivenClear}>
          Go back
        </button>
        <p>Updated whenever warframe wants :D</p>
      </div>
    </div>
  );
}
