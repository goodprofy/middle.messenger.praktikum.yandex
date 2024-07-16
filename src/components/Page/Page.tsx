import { clsx, isDefined } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  isCentered?: boolean;
};

export const Page: FC<PropsWithChildren<Props>> = ({ children, isCentered }) => {
  return <div className={clsx(styles.page, isDefined(isCentered) && isCentered && styles.centered)}>{children}</div>;
};
