import { client } from '../../client';
import { AvatarProfile, Flex, Link, Title } from '../../components';
import { useRouter, useUser } from '../../hooks';
import { ProfileRow } from './components';
import styles from './styles.module.scss';

export const Profile = () => {
  const profile = useUser();
  const router = useRouter();
  const onLogoutClick = () => {
    client.logout().then(() => {
      router.navigate('/');
    });
  };
  return (
    <div className={styles.profile}>
      <Flex gap={1} isCenter isColumn>
        <AvatarProfile />

        <Title as="h2" isCenter>
          {profile.display_name.value}
        </Title>
      </Flex>

      <div>
        {Object.entries(profile).map(([_, { title, value }]) => {
          return <ProfileRow name={title} value={value} />;
        })}
      </div>

      <div>
        <ProfileRow name={<Link to="/settings/edit" title="Изменить данные" />} />
        <ProfileRow name={<Link to="/settings/password" title="Изменить пароль" />} />
        <ProfileRow name={<Link onClick={onLogoutClick} title="Выйти" isError />} />
      </div>
    </div>
  );
};
