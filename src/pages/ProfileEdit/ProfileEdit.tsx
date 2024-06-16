import { AvatarProfile, Button, Flex, Form, ProfileRowEdit } from '../../components';
import { useUser } from '../../hooks';
import styles from './styles.module.scss';

export const ProfileEdit = () => {
  const profile = useUser();
  return (
    <div className={styles.profile_edit}>
      <Form>
        <Flex gap={1} isCenter isColumn>
          <AvatarProfile />
        </Flex>

        <div>
          {Object.entries(profile).map(([key, { title, value }]) => {
            return <ProfileRowEdit name={key} title={title} value={value} />;
          })}
        </div>
        <Button title="Сохранить" type="submit" />
      </Form>
    </div>
  );
};
