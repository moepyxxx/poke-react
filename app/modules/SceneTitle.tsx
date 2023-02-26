type Props = {
  title: string;
};

export const SceneTitle: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};
