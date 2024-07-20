import { isDefined } from '../../utils';
import styles from './styles.module.scss';

type Props = {
  buttons?: string[];
  onBackdropClick?: () => void;
  /** @default true */
  shownBackdrop?: boolean;
  title: string;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  buttons,
  children,
  onBackdropClick,
  shownBackdrop = true,
  title
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2 className={styles.header}>{title}</h2>
        <div className={styles.body}>{children}</div>
        {isDefined(buttons) && buttons.length > 0 ? <div className={styles.footer}>{children}</div> : null}
      </div>
      {shownBackdrop ? <div className={styles.backdrop} onClick={onBackdropClick} /> : null}
    </div>
  );
};
