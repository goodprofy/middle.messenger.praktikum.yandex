import { AvatarProfile, Flex, Link, Title } from '../../components';
import { useUser } from '../../hooks';
import { ProfileRow } from './components';
import styles from './styles.module.scss';

export const Profile = () => {
  const profile = useUser();
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
        <ProfileRow name={<Link to="/" title="Изменить данные" />} />
        <ProfileRow name={<Link to="/" title="Изменить пароль" />} />
        <ProfileRow name={<Link to="/" title="Выйти" isError />} />
      </div>
    </div>
  );
};
