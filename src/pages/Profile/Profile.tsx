import { Flex, Link, Title } from '../../components';
import { useUser } from '../../hooks';
import { Avatar } from './Components';
import { ProfileRow } from './Components/ProfileRow';
import styles from './styles.module.scss';

export const Profile = () => {
  const profile = useUser();
  return (
    <div className={styles.user_settings}>
      <Flex gap={1} isCenter isColumn>
        <Avatar />
        <Title as="h2" isCenter>
          {profile.chatName.value}
        </Title>
      </Flex>

      <div>
        {Object.entries(profile).map(([_, { title, value }]) => {
          return <ProfileRow name={title} value={value} />;
        })}
      </div>
      <div>
        <ProfileRow name={<Link to="/" title="Изменить данные" />} />
        <ProfileRow name={<Link to="/" title="Изменить пароль" />} />
        <ProfileRow name={<Link to="/" title="Выйти" isError />} />
      </div>
    </div>
  );
};
