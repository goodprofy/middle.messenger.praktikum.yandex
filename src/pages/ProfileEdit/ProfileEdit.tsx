import { AvatarProfile, Flex } from '../../components';
import { useUser } from '../../hooks';
import { ProfileForm } from './components';
import styles from './styles.module.scss';

export const ProfileEdit = () => {
  const profile = useUser();
  return (
    <div className={styles.profile_edit}>
      <Flex gap={1} isCenter isColumn>
        <AvatarProfile />
      </Flex>
      <ProfileForm profile={profile} />
    </div>
  );
};
