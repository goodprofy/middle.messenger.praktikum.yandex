import styles from './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
export const Messenger: FC = () => {
  return (
    <div className={styles.chats}>
      <div className={styles.empty}>Select a chat to send a message</div>
    </div>
  );
};
