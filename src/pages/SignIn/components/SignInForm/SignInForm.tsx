import { Component } from '../../../../class';
import { type SignInData, client } from '../../../../client';
import { Button, Form, InputField, Link } from '../../../../components';
import { LOGIN_REG_EXP, PASSWORD_REG_EXP } from '../../../../constants';
import { useRouter } from '../../../../hooks';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type InputFieldProps = ConstructorParameters<typeof InputField>[0];

type Fields = SignInData;

type State = {
  errors: Record<keyof Fields, string[]>;
  fields: Fields;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class SignInForm extends Component<{}, State> {
  state: State = {
    errors: {
      login: [],
      password: []
    },
    fields: {
      login: '',
      password: ''
    }
  };

  loginRef: HTMLInputElement | null = null;
  passwordRef: HTMLInputElement | null = null;

  onFormSubmit = () => {
    const { fields } = this.state;
    client.signIn(fields).then(() => {
      const { navigate } = useRouter();
      navigate('/messenger');
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

  onInputChannge: InputFieldProps['onChange'] = (field, value) => {
    this.setState({ fields: { ...this.state.fields, [field]: value } });
  };

  render() {
    const { fields } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputField
          ref={(el) => {
            this.loginRef = el;
          }}
          name="login"
          type="text"
          label="Login"
          required
          minLength={3}
          maxLength={20}
          pattern={LOGIN_REG_EXP.source}
          checkValidity={this.checkInputValidity}
          onChange={this.onInputChannge}
          value={fields.login}
          errors={this.state.errors.login}
        />
        <InputField
          ref={(el) => {
            this.passwordRef = el;
          }}
          name="password"
          type="password"
          label="Password"
          required
          pattern={PASSWORD_REG_EXP.source}
          minLength={8}
          maxLength={40}
          checkValidity={this.checkInputValidity}
          onChange={this.onInputChannge}
          value={fields.password}
          errors={this.state.errors.password}
        />
        <Button type="submit" title="Sign In" />
        <Link to={'/sign-up'} title="Don't have an account?" />
      </Form>
    );
  }
}
