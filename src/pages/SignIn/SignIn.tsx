import { Modal } from '../../components';
import { SignInForm } from './components';

export const SignIn = () => {
  return (
    <Modal title="Sign In" shownBackdrop={false}>
      <SignInForm />
    </Modal>
  );
};
