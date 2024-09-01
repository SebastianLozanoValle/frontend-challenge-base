import styles from "@/styles/PercentCircle.module.css"

type CSSPropertiesWithVars = React.CSSProperties & {
    [key: `--${string}`]: string | number;
  };

export const PercentCircle = ({ percentage }: {percentage: number}) => {

    const style: CSSPropertiesWithVars = {
        '--percentage': percentage,
    };

    const color = percentage >= 75 ? "green" : percentage >= 45 ? "orange" : "red"

    return (
        <div className={styles.singleChart} style={style}>
          <svg viewBox="0 0 36 36" className={`${styles.circularChart} ${styles[color]}`}>
            <path className={styles.circleBg}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className={styles.circle}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className={styles.percentage}>{percentage}%</text>
          </svg>
        </div>
    )
}