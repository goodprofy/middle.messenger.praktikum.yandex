import { clsx } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  isColumn?: boolean;
  /** gap: (gap x 8)px; */
  gap?: 1 | 2 | 3;
};

export const Flex: FC<PropsWithChildren<Props>> = ({ isColumn, children, gap }) => {
  return <div className={clsx(styles.flex, isColumn && styles.isColumn, styles[`gap_${gap}`])}>{children}</div>;
};
