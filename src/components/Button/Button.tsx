import { clsx } from '../../utils';
import style from './styles.module.scss';

type Props = {
  onClick?: () => void;
  title: string;
  /** @default button */
  type?: HTMLButtonElement['type'];
  /** @default true */
  isFullWidth?: boolean;
} & Pick<HTMLButtonElement, 'name'>;

export const Button: FC<Props> = ({ onClick, title, type = 'button', name, isFullWidth = true }) => {
  return (
    <button
      name={name}
      testID={name}
      className={clsx(style.button, isFullWidth && style.full_width)}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};
