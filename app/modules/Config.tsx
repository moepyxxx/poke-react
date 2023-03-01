import { theme } from "@/config/muiTheme";
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
  const [playtime] = usePlayTime();
  const [_, setPark] = useLocalStorage("park", null);
  const router = useRouter();
  const save = useAppSelector((state) => state.save);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  useEffect(() => {
    // ゲーム開始していない場合は初期化
    if (!save.isGameStart) {
      setPark(null);
      router.push("start");
    }

    dispatch(setPokemons(state.save.pokemons));
  }, []);

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
          プレイじかん：{playtime}
        </Typography>
        <Typography>
          なまえ：<span suppressHydrationWarning>{save.name}</span>
        </Typography>
      </Box>
    );
  }
  return <></>;
};
