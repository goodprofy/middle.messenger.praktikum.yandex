type Props<T> = { checkValidity?: (state: boolean) => void; onSubmit?: (values: T) => void };

export const Form = <T extends Record<string, unknown>>({
  children,
  checkValidity,
  onSubmit
}: PropsWithChildren<Props<T>>) => {
  const onFormSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (checkValidity) {
      const isValid = form.checkValidity();
      checkValidity(isValid);

      if (!isValid) {
        return;
      }
    }

    if (onSubmit) {
      const formElements = Array.from(form.elements);
      const values = formElements.reduce((acc, element) => {
        if (element instanceof HTMLInputElement) {
          if (element.type === 'checkbox' || element.type === 'radio') {
            acc = { ...acc, [element.name]: element.checked };
          } else if (element.type === 'file') {
            const file = new File([element.value], element.value);
            acc = { ...acc, [element.name]: file };
          } else {
            acc = { ...acc, [element.name]: element.value };
          }
        }
        return acc;
      }, {} as T);

      onSubmit(values);
    }
  };
  return <form onSubmit={onFormSubmit}>{children}</form>;
};
