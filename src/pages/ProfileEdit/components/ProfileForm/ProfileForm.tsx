import { Component } from '../../../../class';
import { type UpdateUserParams, client } from '../../../../client';
import { Button, Form, InputField, ProfileRowEdit } from '../../../../components';
import { EMAIL_REG_EXP, LOGIN_REG_EXP, NAME_REG_EXP, PHONE_REG_EXP } from '../../../../constants';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type InputFieldProps = ConstructorParameters<typeof InputField>[0];

type Props = {
  user: UpdateUserParams;
};

type State = {
  errors: Record<keyof UpdateUserParams, string[]>;
  isSubmitting: boolean;
  fields: Props['user'];
};

export class ProfileForm extends Component<Props, State> {
  state: State = {
    errors: {
      display_name: [],
      email: [],
      first_name: [],
      login: [],
      phone: [],
      second_name: []
    },
    isSubmitting: false,
    fields: this.props.user
  };

  constructor(props: Props) {
    super(props);
  }

  onInputChannge: InputFieldProps['onChange'] = (field, value) => {
    this.setState({ fields: { ...this.state.fields, [field]: value } });
  };

  onFormSubmit = () => {
    this.setState({ isSubmitting: true });
    client.updateUser(this.state.fields).finally(() => {
      this.setState({ isSubmitting: false });
    });
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
    const { errors, isSubmitting, fields } = this.state;
    const { display_name, email, first_name, login, phone, second_name } = fields;
    return (
      <Form onSubmit={this.onFormSubmit} checkValidity={() => {}}>
        <div>
          <ProfileRowEdit
            name="email"
            title="Email"
            value={email}
            type="email"
            pattern={EMAIL_REG_EXP.source}
            errors={errors.email}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
          <ProfileRowEdit
            name="login"
            title="Login"
            value={login}
            type="text"
            errors={errors.login}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
            pattern={LOGIN_REG_EXP.source}
            minLength={3}
            maxLength={20}
          />
          <ProfileRowEdit
            name="first_name"
            title="First name"
            value={first_name}
            type="text"
            pattern={NAME_REG_EXP.source}
            errors={errors.first_name}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
          <ProfileRowEdit
            name="second_name"
            title="Last name"
            value={second_name}
            type="text"
            errors={errors.second_name}
            pattern={NAME_REG_EXP.source}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
          <ProfileRowEdit
            name="display_name"
            title="Display name"
            value={display_name}
            type="text"
            errors={errors.display_name}
            checkValidity={this.checkInputValidity}
            onChange={this.onInputChannge}
            required
          />
          <ProfileRowEdit
            name="phone"
            title="Phone"
            value={phone}
            type="tel"
            pattern={PHONE_REG_EXP.source}
            errors={errors.phone}
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
