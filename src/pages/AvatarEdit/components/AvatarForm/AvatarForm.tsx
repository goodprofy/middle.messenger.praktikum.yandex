import { Component } from '../../../../class';
import { Button, Form } from '../../../../components';
import { getInputErrorMessage } from '../../../../utils';

type Fields = {
  avatar: File;
};

type State = {
  errors: Record<keyof Fields, string[]>;
};

export class AvatarForm extends Component<{}, State> {
  state: State = {
    errors: { avatar: [] }
  };

  onFormSubmit = (values: Record<string, unknown>) => {
    console.log(values);
  };

  checkInputValidity = (validity: ValidityState, fieldName: string | undefined) => {
    if (!fieldName) {
      return;
    }

    if (validity.valid) {
      this.setState({ errors: { ...this.state.errors, [fieldName]: [] } });
    } else {
      this.setState({ errors: { ...this.state.errors, [fieldName]: [getInputErrorMessage(validity)] } });
    }
  };

  public render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <input name="avatar" type="file" accept="image/*" required checkValidity={this.checkInputValidity} />
        <Button title="Поменять" type="submit" />
      </Form>
    );
  }
}
