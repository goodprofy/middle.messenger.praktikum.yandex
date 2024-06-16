type Props = { onSubmit?: () => void };

export const Form: FC<PropsWithChildren<Props>> = ({ children, onSubmit }) => {
  const onFormSubmit = (event: Event) => {
    if (onSubmit) {
      event.preventDefault();
      onSubmit();
    }
  };
  return <form onSubmit={onFormSubmit}>{children}</form>;
};
