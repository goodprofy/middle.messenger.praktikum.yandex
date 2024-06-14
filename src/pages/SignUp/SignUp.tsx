import { Button, Form, InputField, Link, Modal } from '../../components';

export const SignUp = () => {
  return (
    <Modal title="Регистрация" shownBackdrop={false}>
      <Form>
        <InputField id="email" type="email" label="Почта" required />
        <InputField id="login" type="text" label="Логин" required />
        <InputField id="firstName" type="text" label="Имя" required />
        <InputField id="lastName" type="text" label="Фамилия" required />
        <InputField id="phone" type="tel" label="Телефон" required />
        <InputField id="password" type="password" label="Пароль" required />
        <InputField id="passwordConfirm" type="password" label="Пароль (ещё раз)" required />
        <Button type="submit" title="Зарегистрироваться" name="SignUp" />
        <Link to={'/sign-in'} title="Войти" />
      </Form>
    </Modal>
  );
};
