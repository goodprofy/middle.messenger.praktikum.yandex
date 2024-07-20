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
          <Link to={'/messenger'} title="Чаты" />
        </li>
        <li>
          <Link to={'/messenger/:id'} title="Чат" />
        </li>
        <li>
          <Link to={'/settings/avatar'} title="Редактировать аватар" />
        </li>
        <li>
          <Link to={'/settings/password'} title="Редактировать пароль" />
        </li>
        <li>
          <Link to={'/settings/edit'} title="Редактировать профайл" />
        </li>
        <li>
          <Link to={'/settings'} title="Профайл" />
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
