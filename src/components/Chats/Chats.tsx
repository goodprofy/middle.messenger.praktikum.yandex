import { ChatsItem } from './components';

type Props = {
  chats: ComponentProps<typeof ChatsItem>[];
};

export const Chats: FC<Props> = ({ chats }) => {
  return (
    <ul>
      {chats.map((rest) => {
        return (
          <li>
            <ChatsItem {...rest} />
          </li>
        );
      })}
      {chats.length === 0 ? <li>Chats not found</li> : ''}
    </ul>
  );
};
