import { Modal } from '../../components';
import { SignUpForm } from './components';

export const SignUp = () => {
  return (
    <Modal title="Регистрация" shownBackdrop={false}>
      <SignUpForm />
    </Modal>
  );
};
