import { clsx } from '../../utils';
import style from './styles.module.scss';

type Props = {
  onClick?: () => void;
  title: string;
  /** @default button */
  type?: HTMLButtonElement['type'];
  /** @default true */
  isFullWidth?: boolean;
  disabled?: HTMLButtonElement['disabled'];
};

export const Button: FC<Props> = ({ onClick, title, disabled, type = 'button', isFullWidth = true }) => {
  return (
    <button
      className={clsx(style.button, isFullWidth && style.full_width, Boolean(disabled) && style.disabled)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
