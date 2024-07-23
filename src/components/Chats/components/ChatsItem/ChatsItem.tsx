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
    <div class={styles.contact} onClick={onChatClick}>
      <Avatar src={avatar} alt={title} />
      <div class={styles.info}>
        <div classList={styles.row}>
          <span class={styles.user_name}>{title}</span>
          {/* <span class={styles.message_time}>{dayjs(created_by).format('L LT')}</span> */}
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
          <span class={styles.unread_message}>{unread_count}</span>
        </div>
      </div>
    </div>
  );
};
