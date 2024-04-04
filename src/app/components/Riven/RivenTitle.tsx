import styles from "./riven.module.scss";

interface RivenTitle {
  riven: RivenData | null;
}

export default function RivenTitle({ riven }: RivenTitle) {
  return (
    <h1 className={styles.rivenTitle}>
      {riven
        ? `${
            riven.rerolled?.compatibility ||
            riven.unrolled?.compatibility ||
            "N/A"
          } Last Week Statistics`
        : "Insert Riven's Name"}
    </h1>
  );
}
