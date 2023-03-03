import { Typography } from "@mui/material";

type Props = {
  title: string;
};

export const SceneTitle: React.FC<Props> = ({ title }) => {
  return (
    // TODO: 場面が変わったら最初に現れてそして消える
    // <Typography variant="body1" component="h1">
    //   {title}
    // </Typography>
    <></>
  );
};
