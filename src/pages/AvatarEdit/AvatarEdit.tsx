import { Modal } from '../../components';
import { useRouter } from '../../hooks';
import { AvatarForm } from './components';

export const AvatarEdit: FC = () => {
  const { navigate } = useRouter();
  const onBackdropClick = () => {
    navigate('/settings');
  };

  return (
    <Modal title="Change avatar" onBackdropClick={onBackdropClick}>
      <AvatarForm />
    </Modal>
  );
};
