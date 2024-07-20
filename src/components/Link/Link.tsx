import { useRouter } from '../../hooks';
import { clsx, isDefined } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  isError?: boolean;
  target?: HTMLLinkElement['target'];
  title: string;
} & ({ to: string; onClick?: never } | { to?: never; onClick: () => void });

export const Link: FC<Props> = ({ isError, onClick, target, title, to }) => {
  const router = useRouter();
  const onLinkClick = (event: Event) => {
    event.preventDefault();
    if (isDefined(onClick)) {
      onClick();
    } else {
      router.navigate(String(to));
    }
  };

  return (
    <a
      href={to}
      title={title}
      target={target}
      className={clsx(styles.link, Boolean(isError) && styles.error)}
      onClick={onLinkClick}
    >
      {title}
    </a>
  );
};
