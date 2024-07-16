import { clsx, isDefined } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  isError?: boolean;
  target?: HTMLLinkElement['target'];
  title: string;
  to: string | -1;
};

export const Link: FC<Props> = ({ isError, target, title, to }) => {
  return (
    <a
      href={to}
      title={title}
      target={target}
      className={clsx(styles.link, isDefined(isError) && isError && styles.error)}
    >
      {title}
    </a>
  );
};
