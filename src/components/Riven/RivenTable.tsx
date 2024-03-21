import React from "react";
import styles from "./riven.module.scss";
import RivenRow from "./RivenRow";

interface RivenTableProps {
  riven: RivenInfo;
  updateRiven: (data: RivenResponse | null) => void;
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
      <button onClick={() => updateRiven(null)} className={styles.rivenClear}>
        Did you mean something else?
      </button>
    </div>
  );
}
