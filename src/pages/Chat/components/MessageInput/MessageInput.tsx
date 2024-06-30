import { Button, Form, TextEditor } from '../../../../components';
import styles from './styles.module.scss';

export const MessageInput: FC = () => {
  const onSubmit = () => {
    alert();
  };
  const onAdd = () => {
    alert();
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className={styles.message_input}>
        <Button isFullWidth={false} title="Add" onClick={onAdd} />
        <div className={styles.text_editor}>
          <TextEditor />
        </div>
        <Button isFullWidth={false} title="Send" type="submit" />
      </div>
    </Form>
  );
};
