import { Component } from '../../../../class';
import { Button, Form, InputField, Link } from '../../../../components';
import { PASSWORD_REG_EXP } from '../../../../constants';
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
        <InputField name="email" type="email" label="Почта" required errors={errors.email} />
        <InputField
          name="login"
          type="text"
          label="Логин"
          required
          minLength={3}
          maxLength={18}
          errors={errors.login}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="first_name"
          type="text"
          label="Имя"
          required
          minLength={3}
          maxLength={18}
          errors={errors.first_name}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="second_name"
          type="text"
          label="Фамилия"
          required
          minLength={3}
          maxLength={18}
          errors={errors.second_name}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="phone"
          type="tel"
          label="Телефон"
          required
          errors={errors.phone}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="password"
          type="password"
          label="Пароль"
          required
          pattern={PASSWORD_REG_EXP}
          minLength={6}
          maxLength={24}
          errors={errors.password}
          checkValidity={this.checkInputValidity}
        />
        <InputField
          name="password_confirm"
          type="password"
          label="Пароль (ещё раз)"
          required
          pattern={PASSWORD_REG_EXP}
          minLength={6}
          maxLength={24}
          errors={errors.password_confirm}
          checkValidity={this.checkInputValidity}
        />
        <Button type="submit" title="Зарегистрироваться" />
        <Link to={'/sign-in'} title="Войти" />
      </Form>
    );
  }
}
