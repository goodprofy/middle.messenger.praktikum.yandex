import { Link } from '../Link';
import { Page } from '../Page';
import { Title } from '../Title';
import styles from './styles.module.scss';

type Props = {
  subTitle: string;
  title: string;
  titleBackLink: string;
};

export const PageError: FC<Props> = ({ subTitle, title, titleBackLink }) => {
  return (
    <Page isCentered>
      <div class={styles.text_center}>
        <Title as="h1">{title}</Title>
        <Title as="h2">{subTitle}</Title>
      </div>
      <Link to={'/'} title={titleBackLink} />
    </Page>
  );
};
