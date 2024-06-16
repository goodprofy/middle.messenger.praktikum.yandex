import { Contact } from './components';
import styles from './styles.module.scss';

const CONTACTS: ComponentProps<typeof Contact>[] = [
  {
    avatar: undefined,
    userName: 'Андрей',
    lastMessage: { text: 'Изображение', isYou: false },
    messageTime: '2023-06-14T20:52:01.123Z',
    unreadMessage: 2
  },
  {
    avatar: undefined,
    userName: 'Киноклуб',
    lastMessage: { text: 'стикер', isYou: true },
    messageTime: '2023-06-14T20:52:01.123Z',
    unreadMessage: 0
  },
  {
    avatar: undefined,
    userName: 'Илья',
    lastMessage: {
      text: 'Друзья, у меня для вас особенный выпуск новостей! Мы начинаем с первой новости',
      isYou: false
    },
    messageTime: '2023-06-14T20:52:01.123Z',
    unreadMessage: 4
  },
  {
    avatar: undefined,
    userName: 'Вадим',
    lastMessage: {
      text: 'Круто!',
      isYou: true
    },
    messageTime: '2023-06-14T20:52:01.123Z',
    unreadMessage: 0
  }
];

export const Contacts: FC = () => {
  return (
    <ul className={styles.contacts}>
      {CONTACTS.map((rest) => {
        return (
          <li className={styles.contact}>
            <Contact {...rest} />
          </li>
        );
      })}
    </ul>
  );
};
