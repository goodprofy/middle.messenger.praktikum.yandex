type Props = {
  target: HTMLLinkElement['target'];
  title: string;
  to: string;
};

export const Link: FC<Props> = ({ target, title, to }) => {
  return (
    <a href={to} title={title} target={target}>
      {title}
    </a>
  );
};
