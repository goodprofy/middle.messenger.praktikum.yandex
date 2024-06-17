import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import styles from './styles.module.scss';
import { Avatar } from '../Avatar';

dayjs.extend(localizedFormat);

type Props = {
  avatar?: string;
  userName: string;
  lastMessage: { text: string; isYou: boolean };
  messageTime: string;
  unreadMessage: number;
};

export const Contact: FC<Props> = ({ avatar, lastMessage, messageTime, unreadMessage, userName }) => {
  return (
    <div className={styles.contact}>
      <Avatar src={avatar} userName={userName} />
      <div className={styles.info}>
        <div classList={styles.row}>
          <span className={styles.user_name}>{userName}</span>
          <span className={styles.message_time}>{dayjs(messageTime).format('L LT')}</span>
        </div>
        <div classList={styles.row}>
          <span classList={styles.last_message}>
            {lastMessage.isYou ? <span classList={styles.you}>Вы: </span> : ''}
            {lastMessage.text}
          </span>
          <span className={styles.unread_message}>{unreadMessage}</span>
        </div>
      </div>
    </div>
  );
};
