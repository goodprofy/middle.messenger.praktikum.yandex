import { Component } from '../../../../class';
import { Button, Form, ProfileRowEdit } from '../../../../components';
import { PASSWORD_REG_EXP } from '../../../../constants';
import { getInputErrorMessage, isDefined } from '../../../../utils';

type Fields = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type State = {
  fields: Record<keyof Fields, string>;
  errors: Record<keyof Fields, string[]>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class ProfilePasswordForm extends Component<{}, State> {
  state: State = {
    fields: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: ''
    },
    errors: {
      oldPassword: [],
      newPassword: [],
      confirmPassword: []
    }
  };

  onFormSubmit = (values: Record<string, unknown>) => {
    console.log(values);
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
      fields: { confirmPassword, newPassword, oldPassword }
    } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit} checkValidity={this.checkFormValidity}>
        <div>
          <ProfileRowEdit
            name="oldPassword"
            title="Старый пароль"
            value={oldPassword}
            type="password"
            pattern={PASSWORD_REG_EXP.source}
            minLength={8}
            maxLength={40}
            errors={errors.oldPassword}
            checkValidity={this.checkInputValidity}
            required
          />
          <ProfileRowEdit
            name="newPassword"
            title="Новый пароль"
            value={newPassword}
            type="password"
            pattern={PASSWORD_REG_EXP.source}
            minLength={8}
            maxLength={40}
            errors={errors.newPassword}
            checkValidity={this.checkInputValidity}
            required
          />
          <ProfileRowEdit
            name="confirmPassword"
            title="Повторите новый пароль"
            value={confirmPassword}
            type="password"
            pattern={PASSWORD_REG_EXP.source}
            minLength={8}
            maxLength={40}
            errors={errors.confirmPassword}
            checkValidity={this.checkInputValidity}
            required
          />
        </div>
        <Button title="Сохранить" type="submit" />
      </Form>
    );
  }
}
