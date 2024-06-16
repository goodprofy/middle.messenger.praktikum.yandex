import { clsx } from '../../utils';
import style from './styles.module.scss';

type Props = {
  onClick?: () => void;
  title: string;
  /** @default button */
  type?: HTMLButtonElement['type'];
  /** @default true */
  isFullWidth?: boolean;
};

export const Button: FC<Props> = ({ onClick, title, type = 'button', isFullWidth = true }) => {
  return (
    <button className={clsx(style.button, isFullWidth && style.full_width)} onClick={onClick} type={type}>
      {title}
    </button>
  );
};
