import { Link } from '../../components';

export const Home: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/sign-in'} title="Авторизация" />
        </li>
        <li>
          <Link to={'/sign-up'} title="Регистрация" />
        </li>
        <li>
          <Link to={'/chats'} title="Чаты" />
        </li>
        <li>
          <Link to={'/chat'} title="Чат" />
        </li>
        <li>
          <Link to={'/profile'} title="Профайл" />
        </li>
        <li>
          <Link to={'/400'} title="400" />
        </li>
        <li>
          <Link to={'/500'} title="500" />
        </li>
      </ul>
    </nav>
  );
};
