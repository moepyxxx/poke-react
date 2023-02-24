import { useAppDispatch, useAppSelector } from "@/hooks";
import { Template } from "@/modules/Template";
import { gameEnd } from "@/stores/parkSlices";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Park() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { park } = useAppSelector((state) => state);

  useEffect(() => {
    if (!park.isStart || park.remainBallCount === 0) {
      dispatch(gameEnd);
      router.push("/");
    }
  }, [router, park]);

  return (
    <Template>
      <div>
        <p>現在いる場所：サファリパーク</p>
        <p>
          残りのボール：
          <span suppressHydrationWarning>{park.remainBallCount}</span>
        </p>
      </div>
      <div>
        <button onClick={() => router.push("/park/kusamura")}>
          草むらをさがす
        </button>
      </div>
    </Template>
  );
}
