import { useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};
export const Template: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const player = useAppSelector((state) => state.player);

  useEffect(() => {
    if (!player.isSet) {
      router.push("start");
    }
  }, [router, player]);

  return (
    <>
      <p>
        なまえ：<span suppressHydrationWarning>{player.name}</span>
      </p>
      <p>
        プレイ時間：<span suppressHydrationWarning>{player.playTime}</span>
      </p>
      {children}
    </>
  );
};
