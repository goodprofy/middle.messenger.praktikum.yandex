import { Modal } from '../../components';
import { SignInForm } from './components';

export const SignIn = () => {
  return (
    <Modal title="Вход" shownBackdrop={false}>
      <SignInForm />
    </Modal>
  );
};
