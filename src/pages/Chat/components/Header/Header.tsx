import { Component } from '../../../../class';
import { type ChatUser, client } from '../../../../client';
import { Button } from '../../../../components';
import { isDefined, logError } from '../../../../utils';
import styles from './styles.module.scss';

type Props = {
  users: ChatUser[];
  onDeleteUserSuccess: () => void;
  chatId: number | undefined;
};

export class Header extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onDeleteUserClick = (userId: ChatUser['id']) => {
    const { chatId } = this.props;
    if (isDefined(chatId)) {
      client
        .deleteUsersFromChat({ chatId, users: [userId] })
        .then(() => {
          this.props.onDeleteUserSuccess();
        })
        .catch((err) => {
          logError(err);
        });
    }
  };

  render() {
    const { users } = this.props;
    return (
      <head className={styles.header}>
        {users.map((user) => {
          return (
            <div className={styles.user}>
              <div className={styles.avatar} />
              <div className={styles.name}>
                <div>#{user.id}</div>
                <div>{user.login}</div>
              </div>
              {user.role !== 'admin' ? (
                <Button
                  isFullWidth={false}
                  title="x"
                  onClick={() => {
                    this.onDeleteUserClick(user.id);
                  }}
                />
              ) : (
                ''
              )}
            </div>
          );
        })}
      </head>
    );
  }
}
