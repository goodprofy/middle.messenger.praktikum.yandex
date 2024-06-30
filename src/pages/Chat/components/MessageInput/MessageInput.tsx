import { Component, eventBus } from '../../../../class';
import { Button, Form, TextEditor } from '../../../../components';
import styles from './styles.module.scss';

type State = {
  message: string;
};

export class MessageInput extends Component<{}, State> {
  state: State = { message: '' };

  onChange = (message: string) => {
    this.setState({ message });
  };

  onSubmit = () => {
    eventBus.emit('chat:send', this.state.message);
    this.setState({ message: '' });
  };

  onAdd = () => {
    alert();
  };

  public render() {
    const { message } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <div className={styles.message_input}>
          <Button isFullWidth={false} title="Add" onClick={this.onAdd} />
          <div className={styles.text_editor}>
            <TextEditor value={message} onChange={this.onChange} />
          </div>
          <Button isFullWidth={false} title="Send" type="submit" />
        </div>
      </Form>
    );
  }
}
