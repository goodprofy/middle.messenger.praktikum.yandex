import { Component } from '../../../../class';
import { Button, Form, InputField, Link } from '../../../../components';
import { EMAIL_REG_EXP, LOGIN_REG_EXP, NAME_REG_EXP, PASSWORD_REG_EXP, PHONE_REG_EXP } from '../../../../constants';
import { getInputErrorMessage } from '../../../../utils';

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
};

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
    }
  };

  onFormSubmit = (values: Record<string, unknown>) => {
    console.log(values);
  };

  checkFormValidity = () => {};

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
    const { errors } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit} checkValidity={this.checkFormValidity}>
        <InputField
          name="email"
          type="email"
          label="Почта"
          required
          pattern={EMAIL_REG_EXP.source}
          errors={errors.email}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="login"
          type="text"
          label="Логин"
          required
          pattern={LOGIN_REG_EXP.source}
          minLength={3}
          maxLength={20}
          errors={errors.login}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="first_name"
          type="text"
          label="Имя"
          required
          pattern={NAME_REG_EXP.source}
          errors={errors.first_name}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="second_name"
          type="text"
          label="Фамилия"
          required
          pattern={NAME_REG_EXP.source}
          errors={errors.second_name}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="phone"
          type="tel"
          label="Телефон"
          required
          pattern={PHONE_REG_EXP.source}
          errors={errors.phone}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="password"
          type="password"
          label="Пароль"
          required
          pattern={PASSWORD_REG_EXP.source}
          minLength={8}
          maxLength={40}
          errors={errors.password}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="password_confirm"
          type="password"
          label="Пароль (ещё раз)"
          required
          pattern={PASSWORD_REG_EXP.source}
          minLength={8}
          maxLength={40}
          errors={errors.password_confirm}
          checkValidity={this.checkInputValidity}
        />
        <Button type="submit" title="Зарегистрироваться" />
        <Link to={'/sign-in'} title="Войти" />
      </Form>
    );
  }
}
