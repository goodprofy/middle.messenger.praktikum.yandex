import { clsx } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  isColumn?: boolean;
  isCenter?: boolean;
  /** gap: (gap x 8)px; */
  gap?: 1 | 2 | 3;
  /** margin-bottom: (value x 8)px; */
  mb?: 1 | 2 | 3;
};

export const Flex: FC<PropsWithChildren<Props>> = ({ isColumn, children, gap, mb, isCenter }) => {
  return (
    <div
      className={clsx(
        styles.flex,
        isColumn && styles.column,
        isCenter && styles.center,
        gap ? styles[`gap_${gap}`] : false,
        mb ? styles[`mb_${mb}`] : false
      )}
    >
      {children}
    </div>
  );
};
