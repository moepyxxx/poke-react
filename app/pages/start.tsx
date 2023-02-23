import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { setName } from "../stores/playerSlices";
import { useRouter } from "next/router";

export default function Start() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [nameInput, setNameInput] = useState<string>("");
  const player = useAppSelector((state) => state.player);

  console.log("start page");
  console.log(player, "player");
  const start = () => {
    dispatch(setName(nameInput));
    router.push("/");
  };

  const reload = () => {
    router.push("/start");
  };

  return (
    <>
      <div>はじめから</div>
      <br />
      <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
      <button onClick={start}>はじめる</button>
      <div>player: {player ? player.name : ""}</div>
      <button onClick={reload}> reload </button>
    </>
  );
}
