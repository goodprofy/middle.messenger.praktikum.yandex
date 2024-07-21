import { client } from '../../client';
import { Link } from '../../components';
import { useRouter } from '../../hooks';
import { ProfileData, ProfileRow } from './components';
import styles from './styles.module.scss';

export const Profile = () => {
  const router = useRouter();
  const onLogoutClick = () => {
    client.logout().then(() => {
      router.navigate('/');
    });
  };
  return (
    <div className={styles.profile}>
      <ProfileData />

      <div>
        <ProfileRow name={<Link to="/settings/edit" title="Change data" />} />
        <ProfileRow name={<Link to="/settings/password" title="Change password" />} />
        <ProfileRow name={<Link onClick={onLogoutClick} title="Logout" isError />} />
      </div>
    </div>
  );
};
