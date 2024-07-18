import { Component } from '../../../../class';
import { Button, Form, InputField, Link } from '../../../../components';
import { LOGIN_REG_EXP, PASSWORD_REG_EXP } from '../../../../constants';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type Fields = {
  login: string;
  password: string;
};

type State = {
  errors: Record<keyof Fields, string[]>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class SignInForm extends Component<{}, State> {
  state: State = {
    errors: {
      login: [],
      password: []
    }
  };

  loginRef: HTMLInputElement | null = null;
  passwordRef: HTMLInputElement | null = null;

  onFormSubmit = (values: Record<string, unknown>) => {
    console.log(values);
  };

  checkFormValidity = (state: boolean) => {
    if (!state) {
      this.loginRef?.reportValidity();
      this.passwordRef?.reportValidity();
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
    return (
      <Form onSubmit={this.onFormSubmit} checkValidity={this.checkFormValidity}>
        <InputField
          ref={(el) => {
            this.loginRef = el;
          }}
          name="login"
          type="text"
          label="Логин"
          required
          minLength={3}
          maxLength={20}
          pattern={LOGIN_REG_EXP.source}
          checkValidity={this.checkInputValidity}
          errors={this.state.errors.login}
        />
        <InputField
          ref={(el) => {
            this.passwordRef = el;
          }}
          name="password"
          type="password"
          label="Пароль"
          required
          pattern={PASSWORD_REG_EXP.source}
          minLength={8}
          maxLength={40}
          checkValidity={this.checkInputValidity}
          errors={this.state.errors.password}
        />
        <Button type="submit" title="Авторизоваться" />
        <Link to={'/sign-up'} title="Нет аккаунта?" />
      </Form>
    );
  }
}
