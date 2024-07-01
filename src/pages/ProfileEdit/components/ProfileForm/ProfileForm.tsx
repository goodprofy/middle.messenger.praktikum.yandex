import { Component } from '../../../../class';
import { Button, Form, ProfileRowEdit } from '../../../../components';
import { EMAIL_REG_EXP, LOGIN_REG_EXP, NAME_REG_EXP, PHONE_REG_EXP } from '../../../../constants';
import { Profile } from '../../../../types';
import { getInputErrorMessage } from '../../../../utils';

type Props = {
  profile: Profile;
};

type State = {
  errors: Record<keyof Profile, string[]>;
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
    const {
      profile: { display_name, email, first_name, login, phone, second_name }
    } = this.props;
    const { errors } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit} checkValidity={this.checkFormValidity}>
        <div>
          <ProfileRowEdit
            name="email"
            title={email.title}
            value={email.value}
            type="email"
            pattern={EMAIL_REG_EXP.source}
            errors={errors.email}
            checkValidity={this.checkInputValidity}
            required
          />
          <ProfileRowEdit
            name="login"
            title={login.title}
            value={login.value}
            type="text"
            errors={errors.login}
            checkValidity={this.checkInputValidity}
            required
            pattern={LOGIN_REG_EXP.source}
            minLength={3}
            maxLength={20}
          />
          <ProfileRowEdit
            name="first_name"
            title={first_name.title}
            value={first_name.value}
            type="text"
            pattern={NAME_REG_EXP.source}
            errors={errors.first_name}
            checkValidity={this.checkInputValidity}
            required
          />
          <ProfileRowEdit
            name="second_name"
            title={second_name.title}
            value={second_name.value}
            type="text"
            errors={errors.second_name}
            pattern={NAME_REG_EXP.source}
            checkValidity={this.checkInputValidity}
            required
          />
          <ProfileRowEdit
            name="display_name"
            title={display_name.title}
            value={display_name.value}
            type="text"
            errors={errors.display_name}
            checkValidity={this.checkInputValidity}
            required
          />
          <ProfileRowEdit
            name="phone"
            title={phone.title}
            value={phone.value}
            type="tel"
            pattern={PHONE_REG_EXP.source}
            errors={errors.phone}
            checkValidity={this.checkInputValidity}
            required
          />
        </div>
        <Button title="Сохранить" type="submit" />
      </Form>
    );
  }
}
