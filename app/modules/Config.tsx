import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { SingleBoxBorder } from "@/pages/_app";
import { setPokemons } from "@/stores/localDataSlices";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

// TODO: middleware的な処理もついでにしているのでmiddlewareでlocalStorageの参照をできる道を探したい
export const Config: React.FC = () => {
  const [playtime, , gameStart] = usePlayTime();
  const [_, setPark] = useLocalStorage("park", null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  useEffect(() => {
    // ゲーム開始していない場合は初期化
    if (!state.save.isGameStart) {
      setPark(null);
      router.push("start");
    }

    dispatch(setPokemons(state.save.pokemons));
    gameStart();
  }, []);

  const playTime = (playtime: number) => {
    const hour = ("00" + Math.floor((playtime % 86400) / 3600)).slice(-2);
    const min = ("00" + Math.floor((playtime % 3600) / 60)).slice(-2);
    const rem = ("00" + (playtime % 60)).slice(-2);

    return `${hour}:${min}:${rem}`;
  };

  if (router.pathname === "/") {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          ...SingleBoxBorder,
          p: 1.5,
        }}
      >
        <Typography suppressHydrationWarning>
          プレイじかん：{playTime(playtime)}
        </Typography>
        <Typography>
          なまえ：<span suppressHydrationWarning>{state.save.name}</span>
        </Typography>
      </Box>
    );
  }
  return <></>;
};
