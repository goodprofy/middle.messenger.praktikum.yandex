import { Component } from '../../../../class';
import { client } from '../../../../client';
import { Button, Form, InputField, Link } from '../../../../components';
import { EMAIL_REG_EXP, LOGIN_REG_EXP, NAME_REG_EXP, PASSWORD_REG_EXP, PHONE_REG_EXP } from '../../../../constants';
import { useRouter } from '../../../../hooks';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type InputFieldProps = ConstructorParameters<typeof InputField>[0];

type Fields = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  password_confirm: string;
};

type State = {
  errors: Record<keyof Fields, string[]>;
  fields: Fields;
  formIsValid: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class SignUpForm extends Component<{}, State> {
  state: State = {
    errors: {
      login: [],
      password: [],
      email: [],
      first_name: [],
      password_confirm: [],
      phone: [],
      second_name: []
    },
    fields: {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      password_confirm: ''
    },
    formIsValid: false
  };

  onFormSubmit = () => {
    client.signUp(this.state.fields).then(({ response: { id } }) => {
      if (id !== 0) {
        const { login, password } = this.state.fields;
        client.signIn({ login, password }).then(() => {
          const { navigate } = useRouter();
          navigate('/messenger');
        });
      }
    });
  };

  checkInputValidity: InputFieldProps['checkValidity'] = (validity, fieldName) => {
    if (!isDefined(fieldName)) {
      return;
    }

    if (validity.valid) {
      this.setState({ errors: { ...this.state.errors, [fieldName]: [] } });
    } else {
      this.setState({ errors: { ...this.state.errors, [fieldName]: [getInputErrorMessage(validity)] } });
    }
  };

  onInputChannge: InputFieldProps['onChange'] = (field, value) => {
    this.setState({ fields: { ...this.state.fields, [field]: value } });
  };

  public render() {
    const { errors, fields } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputField
          name="email"
          type="email"
          label="Email"
          required
          pattern={EMAIL_REG_EXP.source}
          errors={errors.email}
          value={fields.email}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="login"
          type="text"
          label="Login"
          required
          pattern={LOGIN_REG_EXP.source}
          minLength={3}
          maxLength={20}
          errors={errors.login}
          value={fields.login}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="first_name"
          type="text"
          label="First name"
          required
          pattern={NAME_REG_EXP.source}
          errors={errors.first_name}
          value={fields.first_name}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="second_name"
          type="text"
          label="Last name"
          required
          pattern={NAME_REG_EXP.source}
          errors={errors.second_name}
          value={fields.second_name}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="phone"
          type="tel"
          label="Phone"
          required
          pattern={PHONE_REG_EXP.source}
          errors={errors.phone}
          value={fields.phone}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          required
          pattern={PASSWORD_REG_EXP.source}
          minLength={8}
          maxLength={40}
          errors={errors.password}
          value={fields.password}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="password_confirm"
          type="password"
          label="Confirm password"
          required
          pattern={PASSWORD_REG_EXP.source}
          minLength={8}
          maxLength={40}
          errors={errors.password_confirm}
          value={fields.password_confirm}
          onChange={this.onInputChannge}
          checkValidity={this.checkInputValidity}
        />
        <Button type="submit" title="Sign Up" />
        <Link to={'/sign-in'} title="Sign In" />
      </Form>
    );
  }
}
