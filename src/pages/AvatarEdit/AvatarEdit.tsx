import { Button, Form, Modal } from '../../components';

export const AvatarEdit: FC = () => {
  return (
    <Modal title="Загрузите файл">
      <Form>
        <input name="avatar" type="file" accept="image/*" />
        <Button title="Поменять" type="submit" />
      </Form>
    </Modal>
  );
};
