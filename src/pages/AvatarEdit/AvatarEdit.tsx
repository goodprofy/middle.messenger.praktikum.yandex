import { Modal } from '../../components';
import { AvatarForm } from './components';

export const AvatarEdit: FC = () => {
  return (
    <Modal title="Загрузите файл">
      <AvatarForm />
    </Modal>
  );
};
