import { Component, eventBus } from '../../../../class';
import photoPng from './assets/photo.png';

type State = {
  messages: string[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class Messages extends Component<{}, State> {
  state: State = {
    messages: []
  };

  constructor() {
    super({});
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
