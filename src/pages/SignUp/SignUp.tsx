import { Modal } from '../../components';
import { SignUpForm } from './components';

export const SignUp = () => {
  return (
    <Modal title="Registration" shownBackdrop={false}>
      <SignUpForm />
    </Modal>
  );
};
