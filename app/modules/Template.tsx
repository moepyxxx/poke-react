import { useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};
export const Template: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const save = useAppSelector((state) => state.save);

  useEffect(() => {
    if (!save.isGameStart) {
      router.push("start");
    }
  }, [router, save]);

  return (
    <>
      <p>
        なまえ：<span suppressHydrationWarning>{save.name}</span>
      </p>
      <p>
        プレイ時間：<span suppressHydrationWarning>{save.playTime}</span>
      </p>
      {children}
    </>
  );
};
