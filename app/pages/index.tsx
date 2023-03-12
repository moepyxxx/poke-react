import { parkLocalStorageName } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Action } from "@/modules/SelectPanel";
import { Panel, PanelAction } from "@/modules/Panel";
import { FieldScreen } from "@/modules/FieldScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { setPokemons } from "@/stores/saveSlices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WalkField } from "@/modules/field/WalkField";
import { createFieldInFrontOfSafariPark } from "@/config/field";

export default function Home() {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const [park, setPark] = useLocalStorage(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const [_, savePlayTime] = usePlayTime();
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);
  const [isPanelDisplay, setIsPanelDisplay] = useState<boolean>(false);

  useEffect(() => {
    // TOPに来た時点でparkのデータが残ってたらゴミなので削除
    if (park) {
      setPark(null);
    }

    // TODO: セーブデータがあればその場所から、とかしたい
    router.push("/field/in_front_of_safari_park");
  }, []);
  return <></>;
}
