import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useStore } from '../../../../hooks';
import { type User } from '../../../../client';
import styles from './styles.module.scss';
import { clsx } from '../../../../utils';
dayjs.extend(localizedFormat);

type Props = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: 'message' | 'user connected';
};

export const Message: FC<Props> = ({ content, id, time, user_id }) => {
  const store = useStore();

  const { user: currentUser } = store.getState<{ user: User }>();

  const isOwner = Number(user_id) === currentUser.id;

  return (
    <div key={id} className={clsx(styles.message, isOwner && styles.message_owner)}>
      <div>
        #{user_id} {dayjs(time).format('L LT')}
      </div>
      <div>{content}</div>
    </div>
  );
};
