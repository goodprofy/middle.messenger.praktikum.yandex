import { Component, eventBus } from '../../../../class';
import photoPng from './assets/photo.png';

type State = {
  messages: string[];
};

export class Messages extends Component<{}, State> {
  state: State = {
    messages: []
  };

  constructor(props: {}) {
    super(props);
    eventBus.on('chat:send', (message: string) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <img src={photoPng} alt="Фотокамера" />
        {messages.map((message) => {
          return <div>{message}</div>;
        })}
      </div>
    );
  }
}
