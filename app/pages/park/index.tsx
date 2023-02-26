import { parkLocalStorageName } from "@/config";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { SceneTitle } from "@/modules/SceneTitle";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ParkIndex() {
  const router = useRouter();
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);

  useEffect(() => {
    if (park) return;

    setPark({
      isStart: true,
      remainBallCount: 4,
      capturePokemons: [],
    });
  }, []);

  return (
    <>
      <div>
        <SceneTitle title="サファリパーク内" />
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
    </>
  );
}
