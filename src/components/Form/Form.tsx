type Props = { onSubmit?: () => void };

export const Form: FC<PropsWithChildren<Props>> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
