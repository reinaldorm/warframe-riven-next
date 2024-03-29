import styles from "./riven.module.scss";

export default function RivenInfo() {
  return (
    <button className={styles.rivenInfo}>
      <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5C5 7.5 5 5.58579 5 5M5 3V3.0376M4 1.5H5H6.08696M4 1.5H6.08696M4 1.5V1.5C2.34315 1.5 1 2.84315 1 4.5V6.41304C1 6.43776 1 6.46644 1 6.49869C0.999995 8.15556 2.34314 9.5 4 9.5V9.5H5H6.08696V9.5C7.69579 9.5 9 8.19466 9 6.58583C9 6.51663 9 6.45821 9 6.41304V4.41304C9 2.80421 7.69579 1.5 6.08696 1.5V1.5"
          stroke="#6B6B6B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
