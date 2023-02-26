export type Action = {
  label: string;
  fn: () => void;
  hidden?: boolean;
};
type Props = {
  actions: Action[];
};
export const Controller: React.FC<Props> = ({ actions }) => {
  return (
    <>
      {actions.map((action, index) => {
        if (action.hidden) {
          return <div key={index}></div>;
        }
        return (
          <div key={index}>
            <button onClick={action.fn}>{action.label}</button>
          </div>
        );
      })}
    </>
  );
};
