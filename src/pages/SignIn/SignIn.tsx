import { Button, Form, InputField, Link, Modal } from '../../components';

export const SignIn = () => {
  return (
    <Modal title="Вход" shownBackdrop={false}>
      <Form>
        <InputField id="login" type="text" label="Логин" required />
        <InputField id="password" type="password" label="Пароль" required />
        <Button type="submit" title="Авторизоваться" name="SignIn" />
        <Link to={'/sign-up'} title="Нет аккаунта?" />
      </Form>
    </Modal>
  );
};
