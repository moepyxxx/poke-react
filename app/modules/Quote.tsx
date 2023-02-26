import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Quote: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
