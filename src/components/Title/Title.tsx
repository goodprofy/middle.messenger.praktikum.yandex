import { clsx, isDefined } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  /** @default h1 */
  as?: 'h1' | 'h2';
  isCenter?: boolean;
};

export const Title: FC<PropsWithChildren<Props>> = ({ as = 'h1', children, isCenter }) => {
  const Tag = as;
  return <Tag class={clsx(styles[as], isDefined(isCenter) && styles.center)}>{children}</Tag>;
};
