import styles from './styles.module.scss';
import photoPng from './assets/photo.png';

export const Messages: FC = () => {
  return (
    <div className={styles.messages}>
      <img src={photoPng} />
    </div>
  );
};
