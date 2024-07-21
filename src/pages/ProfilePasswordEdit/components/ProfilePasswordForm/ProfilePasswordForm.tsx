import { Component } from '../../../../class';
import { UpdateUserPasswordParams, client } from '../../../../client';
import { Button, Form, InputField, ProfileRowEdit } from '../../../../components';
import { PASSWORD_REG_EXP } from '../../../../constants';
import { useRouter } from '../../../../hooks';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type InputFieldProps = ConstructorParameters<typeof InputField>[0];

type Fields = {
  confirmPassword: string;
} & UpdateUserPasswordParams;

type State = {
  fields: Fields;
  errors: Record<keyof Fields, string[]>;
  isSubmitting: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class ProfilePasswordForm extends Component<{}, State> {
  state: State = {
    errors: {
      oldPassword: [],
      newPassword: [],
      confirmPassword: []
    },
    fields: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: ''
    },
    isSubmitting: false
  };

  onInputChannge: InputFieldProps['onChange'] = (field, value) => {
    this.setState({ fields: { ...this.state.fields, [field]: value } });
  };

  onFormSubmit = () => {
    this.setState({ isSubmitting: true });
    client
      .updateUserPassword(this.state.fields)
      .then(() => {
        const { navigate } = useRouter();
        navigate('/settings');
      })
      .finally(() => {
        this.setState({ isSubmitting: false });
      });
  };

  checkFormValidity = () => {};

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
    const {
      errors,
      fields: { confirmPassword, newPassword, oldPassword },
      isSubmitting
    } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit} checkValidity={this.checkFormValidity}>
        <div>
          <ProfileRowEdit
            name="oldPassword"
            title="Old password"
            value={oldPassword}
            type="password"
            pattern={PASSWORD_REG_EXP.source}
            minLength={8}
            maxLength={40}
            errors={errors.oldPassword}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
          <ProfileRowEdit
            name="newPassword"
            title="New password"
            value={newPassword}
            type="password"
            pattern={PASSWORD_REG_EXP.source}
            minLength={8}
            maxLength={40}
            errors={errors.newPassword}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
          <ProfileRowEdit
            name="confirmPassword"
            title="Confirm password"
            value={confirmPassword}
            type="password"
            pattern={PASSWORD_REG_EXP.source}
            minLength={8}
            maxLength={40}
            errors={errors.confirmPassword}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
        </div>
        <Button title={isSubmitting ? 'Submitting...' : 'Save'} type="submit" />
      </Form>
    );
  }
}
