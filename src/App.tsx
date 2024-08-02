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

const signIn = () => (
  <LayoutPublic>
    <SignIn />
  </LayoutPublic>
);
const signUp = () => (
  <LayoutPublic>
    <SignUp />
  </LayoutPublic>
);

export const App = () => {
  const routes = [
    { path: '/', component: signIn },
    { path: '/sign-in', component: signIn },
    { path: '/sign-up', component: signUp }
  ];
  return (
    <Navigator
      routes={routes}
      NotFound={
        <LayoutPublic>
          <NotFound />
        </LayoutPublic>
      }
    />
  );
};
