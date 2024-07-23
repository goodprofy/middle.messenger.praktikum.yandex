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
    <div class={styles.modal}>
      <div class={styles.content}>
        <h2 class={styles.header}>{title}</h2>
        <div class={styles.body}>{children}</div>
        {isDefined(buttons) && buttons.length > 0 ? <div class={styles.footer}>{children}</div> : null}
      </div>
      {shownBackdrop ? <div class={styles.backdrop} onClick={onBackdropClick} /> : null}
    </div>
  );
};
