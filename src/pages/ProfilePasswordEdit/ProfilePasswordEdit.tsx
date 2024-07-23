import { AvatarProfile, Flex } from '../../components';
import { ProfilePasswordForm } from './components';
import styles from './styles.module.scss';

export const ProfilePasswordEdit = () => {
  return (
    <div class={styles.profile_password_edit}>
      <Flex gap={1} isCenter isColumn>
        <AvatarProfile />
      </Flex>
      <ProfilePasswordForm />
    </div>
  );
};
