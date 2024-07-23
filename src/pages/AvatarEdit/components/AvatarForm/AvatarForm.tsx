import { Component } from '../../../../class';
import { client } from '../../../../client';
import { Button, Form } from '../../../../components';
import { useRouter } from '../../../../hooks';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type Fields = {
  avatar: File | undefined;
};

type State = {
  errors: Record<keyof Fields, string[]>;
  fields: Fields;
  isSubmitting: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class AvatarForm extends Component<{}, State> {
  state: State = {
    errors: { avatar: [] },
    fields: { avatar: undefined },
    isSubmitting: false
  };

  onFormSubmit = () => {
    const { avatar } = this.state.fields;
    if (avatar) {
      this.setState({ isSubmitting: true });
      client
        .updateUserAvatar({ avatar })
        .then(() => {
          const { navigate } = useRouter();
          navigate('/settings');
        })
        .finally(() => {
          this.setState({ isSubmitting: false });
        });
    }
  };

  onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (isDefined(input) && isDefined(input.files)) {
      const file = input.files[0];
      this.setState({ fields: { avatar: file } });
    }
  };

  checkInputValidity = (validity: ValidityState, fieldName: string | undefined) => {
    if (!isDefined(fieldName)) {
      return;
    }

    if (validity.valid) {
      this.setState({ errors: { ...this.state.errors, [fieldName]: [] } });
    } else {
      this.setState({ errors: { ...this.state.errors, [fieldName]: [getInputErrorMessage(validity)] } });
    }
  };

  public render() {
    const { avatar } = this.state.fields;
    const { isSubmitting } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <input
          name="avatar"
          type="file"
          accept="image/*"
          required
          checkValidity={this.checkInputValidity}
          onChange={this.onFileChange}
          value={avatar}
        />
        <Button title={isSubmitting ? 'Submitting...' : 'Change'} type="submit" />
      </Form>
    );
  }
}
