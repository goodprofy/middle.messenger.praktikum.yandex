import { Router } from './class';
import { Chat as LayoutChat, Public as LayoutPublic, User as LayoutUser } from './layout';
import {
  AvatarEdit,
  Chat,
  Messenger,
  NotFound,
  Profile,
  ProfileEdit,
  ProfilePasswordEdit,
  ServerError,
  SignIn,
  SignUp
} from './pages';
import { Navigator } from './Navigator';
import './styles.scss';

const router = new Router();

router
  .use('/', () => (
    <LayoutPublic>
      <SignIn />
    </LayoutPublic>
  ))
  .use('/sign-in', () => (
    <LayoutPublic>
      <SignIn />
    </LayoutPublic>
  ))
  .use('/sign-up', () => (
    <LayoutPublic>
      <SignUp />
    </LayoutPublic>
  ))
  .use('/messenger', () => (
    <LayoutChat>
      <Messenger />
    </LayoutChat>
  ))
  .use('/messenger/:id', () => (
    <LayoutChat>
      <Chat />
    </LayoutChat>
  ))
  .use('/settings', () => (
    <LayoutUser>
      <Profile />
    </LayoutUser>
  ))
  .use('/settings/edit', () => (
    <LayoutUser>
      <ProfileEdit />
    </LayoutUser>
  ))
  .use('/settings/avatar', () => (
    <LayoutUser>
      <Profile />
      <AvatarEdit />
    </LayoutUser>
  ))
  .use('/settings/password', () => (
    <LayoutUser>
      <ProfilePasswordEdit />
    </LayoutUser>
  ))
  .use('/400', () => (
    <LayoutPublic>
      <NotFound />
    </LayoutPublic>
  ))
  .use('/500', () => (
    <LayoutPublic>
      <ServerError />
    </LayoutPublic>
  ))
  .start();

export const App = () => {
  return <Navigator router={router} />;
};
