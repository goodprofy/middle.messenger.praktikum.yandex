import styles from './styles.module.scss';
export const Loading: FC = () => {
  return (
    <div class={styles.loading}>
      <div class={styles.bars}>
        <div class={styles.bar}></div>
        <div class={styles.bar}></div>
        <div class={styles.bar}></div>
        <div class={styles.bar}></div>
        <div class={styles.bar}></div>
      </div>
    </div>
  );
};
