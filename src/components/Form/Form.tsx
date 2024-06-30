type Values = Record<string, unknown>;

type Props = { checkValidity?: (state: boolean) => void; onSubmit?: (values: Values) => void };

export const Form: FC<PropsWithChildren<Props>> = ({ children, checkValidity, onSubmit }) => {
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
      const data = new FormData(form);
      let values: Values = {};

      data.forEach((value, field) => {
        const element = form.elements.namedItem(field) as HTMLInputElement | RadioNodeList;

        if (element instanceof HTMLInputElement) {
          if (element.type === 'checkbox' || element.type === 'radio') {
            values = { ...values, [field]: element.checked };
          } else {
            values = { ...values, [field]: value };
          }
        } else if (element instanceof RadioNodeList) {
          element.forEach((radio) => {
            if ((radio as HTMLInputElement).checked) {
              values = { ...values, [field]: (radio as HTMLInputElement).value };
            }
          });
        }
      });
      onSubmit(values);
    }
  };
  return <form onSubmit={onFormSubmit}>{children}</form>;
};
