import { Button, Form, InputField, Link, Modal } from '../../components';

export const SignUp = () => {
  return (
    <Modal title="Регистрация" shownBackdrop={false}>
      <Form>
        <InputField name="email" type="email" label="Почта" required />
        <InputField name="login" type="text" label="Логин" required />
        <InputField name="first_name" type="text" label="Имя" required />
        <InputField name="second_name" type="text" label="Фамилия" required />
        <InputField name="phone" type="tel" label="Телефон" required />
        <InputField name="password" type="password" label="Пароль" required />
        <InputField name="password_confirm" type="password" label="Пароль (ещё раз)" required />
        <Button type="submit" title="Зарегистрироваться" />
        <Link to={'/sign-in'} title="Войти" />
      </Form>
    </Modal>
  );
};
