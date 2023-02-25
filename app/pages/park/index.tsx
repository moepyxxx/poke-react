import { parkLocalStorageName } from "@/config";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Template } from "@/modules/Template";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ParkIndex() {
  const router = useRouter();
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);

  useEffect(() => {
    if (park) return;

    setPark({
      isStart: true,
      remainBallCount: 20,
    });
  }, []);

  return (
    <Template>
      <div>
        <p>現在いる場所：サファリパーク</p>
        <p>
          残りのボール：
          <span suppressHydrationWarning>
            {park ? park.remainBallCount : 0}
          </span>
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
