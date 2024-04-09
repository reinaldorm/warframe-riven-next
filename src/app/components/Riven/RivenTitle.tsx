import styles from "./riven.module.scss";

interface RivenTitleProps {
  riven: RivenData | null;
}

export default function RivenTitle({ riven }: RivenTitleProps) {
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
