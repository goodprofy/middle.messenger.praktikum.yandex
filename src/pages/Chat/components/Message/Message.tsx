import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

type Props = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: 'message' | 'user connected';
};

export const Message: FC<Props> = ({ content, id, time, type, user_id }) => {
  return (
    <div key={id} data-user-id={user_id} data-type={type}>
      <div>{dayjs(time).format('L LT')}</div>
      <div>{content}</div>
    </div>
  );
};
