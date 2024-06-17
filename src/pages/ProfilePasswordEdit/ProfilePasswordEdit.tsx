import { AvatarProfile, Button, Flex, Form, ProfileRowEdit } from '../../components';
import styles from './styles.module.scss';

export const ProfilePasswordEdit = () => {
  return (
    <div className={styles.profile_password_edit}>
      <Form>
        <Flex gap={1} isCenter isColumn>
          <AvatarProfile />
        </Flex>

        <div>
          <ProfileRowEdit name="oldPassword" title="Старый пароль" value="123" type="password" />
          <ProfileRowEdit name="newPassword" title="Новый пароль" value="1234" type="password" />
          <ProfileRowEdit name="confirmPassword" title="Повторите новый пароль" value="1234" type="password" />
        </div>
        <Button title="Сохранить" type="submit" />
      </Form>
    </div>
  );
};
