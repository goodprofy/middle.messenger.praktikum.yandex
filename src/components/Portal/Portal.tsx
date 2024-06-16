import { usePortal } from '../../hooks';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  if (children && Array.isArray(children)) {
    usePortal(children, document.body);
  }

  return null;
};
