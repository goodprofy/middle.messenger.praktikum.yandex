import { Chat as LayoutChat, Public as LayoutPublic, User as LayoutUser } from '../layout';
import { SignIn, NotFound, ServerError, SignUp, Profile, Chats, Chat, Home } from '../pages';

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
