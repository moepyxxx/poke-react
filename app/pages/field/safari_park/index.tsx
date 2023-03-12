import { parkLocalStorageName } from "@/config";
import { PanelAction } from "@/config/types";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Panel } from "@/modules/Panel";
import { SceneTitle } from "@/modules/SceneTitle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ParkIndex() {
  const router = useRouter();
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);
  const [panelActions, setPanelActions] = useState<PanelAction<"">[]>([]);

  useEffect(() => {
    if (park != null) return;

    setPark({
      isStart: true,
      field: null,
      remainBallCount: 4,
      capturePokemons: [],
    });
  }, []);

  useEffect(() => {
    if (!park) return;
    setPanelActions([
      {
        quote: `残りのボールが0になるまでサファリパーク内を探索しましょう（ボールの残り：${park.remainBallCount}）。`,
        selectableActions: [
          { label: "くさむらを探す", fn: () => router.push("/park/kusamura") },
        ],
      },
    ]);
  }, [park]);

  return (
    <>
      <SceneTitle title="サファリパーク内" />
      <Panel
        actions={panelActions}
        currentActionIndex={currentActionPanelIndex}
        setCurrentActionIndex={setCurrentActionPanelIndex}
        isDisplay
      />
    </>
  );
}
