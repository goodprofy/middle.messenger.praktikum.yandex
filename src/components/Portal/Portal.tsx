import { usePortal } from '../../hooks';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  usePortal(children, document.body);

  return null;
};
