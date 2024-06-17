import { Chat as LayoutChat, Public as LayoutPublic, User as LayoutUser } from '../layout';
import {
  AvatarEdit,
  Chat,
  Chats,
  Home,
  NotFound,
  Profile,
  ProfileEdit,
  ProfilePasswordEdit,
  ServerError,
  SignIn,
  SignUp
} from '../pages';

export const Router = () => {
  const checkPath = (path: string) => {
    const { pathname } = document.location;
    return pathname.includes(path);
  };

  if (checkPath('/sign-in')) {
    return (
      <LayoutPublic>
        <SignIn />
      </LayoutPublic>
    );
  }

  if (checkPath('/sign-up')) {
    return (
      <LayoutPublic>
        <SignUp />
      </LayoutPublic>
    );
  }

  if (checkPath('/chats')) {
    return (
      <LayoutChat>
        <Chats />
      </LayoutChat>
    );
  }

  if (checkPath('/chat')) {
    return (
      <LayoutChat>
        <Chat />
      </LayoutChat>
    );
  }

  if (checkPath('/profile/password')) {
    return (
      <LayoutUser>
        <ProfilePasswordEdit />
      </LayoutUser>
    );
  }

  if (checkPath('/profile/avatar')) {
    return (
      <LayoutUser>
        <Profile />
        <AvatarEdit />
      </LayoutUser>
    );
  }

  if (checkPath('/profile/edit')) {
    return (
      <LayoutUser>
        <ProfileEdit />
      </LayoutUser>
    );
  }

  if (checkPath('/profile')) {
    return (
      <LayoutUser>
        <Profile />
      </LayoutUser>
    );
  }

  if (checkPath('/400')) {
    return (
      <LayoutPublic>
        <NotFound />
      </LayoutPublic>
    );
  }

  if (checkPath('/500')) {
    return (
      <LayoutPublic>
        <ServerError />
      </LayoutPublic>
    );
  }

  return (
    <LayoutPublic>
      <Home />
    </LayoutPublic>
  );
};
