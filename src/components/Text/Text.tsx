type Props = {
  /** @default span */
  as?: 'p' | 'span' | 'label';
};

export const Text: FC<PropsWithChildren<Props>> = ({ as = 'span', children }) => {
  const Tag = as;
  return <Tag>{children}</Tag>;
};
