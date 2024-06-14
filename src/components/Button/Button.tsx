type Props = {
  onClick: () => void;
};

export const Button: FC<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
