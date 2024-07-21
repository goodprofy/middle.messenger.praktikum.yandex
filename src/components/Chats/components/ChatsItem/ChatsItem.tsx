import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { type Chat } from '../../../../client';
import { useRouter } from '../../../../hooks';
import { Avatar } from '../Avatar';
import styles from './styles.module.scss';

dayjs.extend(localizedFormat);

type Props = Chat;

export const ChatsItem: FC<Props> = ({ avatar, id, last_message, title, unread_count }) => {
  const onChatClick = () => {
    const { navigate } = useRouter();
    navigate(`/messenger/${id}`);
  };
  return (
    <div className={styles.contact} onClick={onChatClick}>
      <Avatar src={avatar} userName={title} />
      <div className={styles.info}>
        <div classList={styles.row}>
          <span className={styles.user_name}>{title}</span>
          {/* <span className={styles.message_time}>{dayjs(created_by).format('L LT')}</span> */}
        </div>
        <div classList={styles.row}>
          {last_message ? (
            <span classList={styles.last_message}>
              {last_message.user.login === '1' ? <span classList={styles.you}>Вы: </span> : ''}
              {last_message.content}
            </span>
          ) : (
            ''
          )}
          <span className={styles.unread_message}>{unread_count}</span>
        </div>
      </div>
    </div>
  );
};
