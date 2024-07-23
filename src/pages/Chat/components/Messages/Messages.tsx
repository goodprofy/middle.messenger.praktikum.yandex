import { Component, Socket } from '../../../../class';
import { Flex } from '../../../../components';
import { isDefined } from '../../../../utils';
import { Message } from '../Message';

type Props = {
  socket: Socket;
  onUserConnected: () => void;
};

type Message = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: 'message' | 'user connected';
};

type State = {
  messages: Message[] | undefined;
};

export class Messages extends Component<Props, State> {
  state: State = {
    messages: undefined
  };

  constructor(props: Props) {
    super(props);
    props.socket.instance.addEventListener('open', () => {
      props.socket.getMessages();
    });

    props.socket.instance.addEventListener('message', (event) => {
      const response = JSON.parse(event.data) as Message | Message[];

      if (Array.isArray(response)) {
        this.setState({ messages: [...response].reverse() });
      } else if (response.type === 'message') {
        this.setState({ messages: [...(this.state.messages || []), response] });
      } else if (response.type === 'user connected') {
        this.props.onUserConnected();
      }
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <Flex isColumn gap={2}>
        {messages?.map((message) => {
          return <Message {...message} />;
        })}
        {!isDefined(messages) ? <Flex isCenter>Loading...</Flex> : ''}
        {isDefined(messages) && messages.length === 0 ? <Flex isCenter>Chat is empty</Flex> : ''}
      </Flex>
    );
  }
}
