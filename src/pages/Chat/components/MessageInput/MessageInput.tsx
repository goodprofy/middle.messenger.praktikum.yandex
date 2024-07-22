import { Component } from '../../../../class';
import { Button, Form, Modal, TextAreaField } from '../../../../components';
import { useRouter } from '../../../../hooks';
import { isDefined, trim } from '../../../../utils';
import { AddUserForm } from '../AddUserForm';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (message: string) => void;
  onUserAddSuccess: () => void;
  chatId: number | undefined;
};

type State = {
  message: string;
  shownAddUserModal: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class MessageInput extends Component<Props, State> {
  state: State = { message: '', shownAddUserModal: false };
  formRef: HTMLFormElement | null = null;
  constructor(props: Props) {
    super(props);
  }

  onTextAreaChange = (message: string) => {
    this.setState({ message });
  };

  onTextAreaKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.onFormSubmit();
    }
  };

  onFormSubmit = () => {
    const message = trim(this.state.message);
    if (message.length > 0) {
      this.props.onSubmit(message);
      this.onTextAreaChange('');
    }
  };

  onUserAddClick = () => {
    this.setState({ shownAddUserModal: true });
  };

  onAddUserModalBackdropClick = () => {
    this.setState({ shownAddUserModal: false });
  };

  onAddUserFormSuccess = () => {
    this.setState({ shownAddUserModal: false });
    this.props.onUserAddSuccess();
  };

  public render() {
    const { message, shownAddUserModal } = this.state;

    const { getParams } = useRouter();
    const { id: chatId } = getParams<{ id: number }>(window.location.pathname);

    return (
      <Form onSubmit={this.onFormSubmit}>
        <div className={styles.message_input}>
          <Button isFullWidth={false} title="Add" onClick={this.onUserAddClick} />
          <div className={styles.text_editor}>
            <TextAreaField
              name="message"
              value={message}
              onChange={this.onTextAreaChange}
              label="Message"
              onKeyPress={this.onTextAreaKeyPress}
            />
          </div>
          <Button isFullWidth={false} title="Send" type="submit" />
        </div>
        {shownAddUserModal && isDefined(chatId) ? (
          <Modal title="Add User to Chat" onBackdropClick={this.onAddUserModalBackdropClick}>
            <AddUserForm onSuccess={this.onAddUserFormSuccess} chatId={chatId} />
          </Modal>
        ) : (
          ''
        )}
      </Form>
    );
  }
}
