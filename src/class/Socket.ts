import { API_WS_URL } from '../constants';

export class Socket {
  public instance: WebSocket;

  constructor(url: string) {
    const fullUrl = `${API_WS_URL}${url}`;
    const socket = new WebSocket(fullUrl);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', (event: Event) => {
      console.log('Ошибка', event);
    });

    this.instance = socket;
  }

  send = (message: string) => {
    this.instance.send(
      JSON.stringify({
        content: message,
        type: 'message'
      })
    );
  };

  getMessages = () => {
    this.instance.send(
      JSON.stringify({
        content: '0',
        type: 'get old'
      })
    );
  };
}
