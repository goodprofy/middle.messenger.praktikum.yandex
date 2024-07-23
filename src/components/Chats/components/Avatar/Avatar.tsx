import { API_STATIC_URL } from '../../../../constants';
import { isDefined } from '../../../../utils';
import styles from './styles.module.scss';

type Props = { src?: string; alt: string };

export const Avatar: FC<Props> = ({ src, alt }) => {
  if (isDefined(src)) {
    <img className={styles.avatar} src={API_STATIC_URL + src} alt={alt} title={alt} />;
  }
  return <div className={styles.avatar} />;
};
