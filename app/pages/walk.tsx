import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";

// 画面上の座標数
// const screenBlockCount = 17;
const screenBlockCount = 8;

// すべての座標数
// const allBlockCount = 34;
const allBlockCount = 10;

// すべてのフィールド数
const allFieldBlocks = Array.from(
  new Array(allBlockCount ** 2),
  (x, i) => i + 1
);

// スタート位置を算出する
const getStartCoordinate = (
  middleCoordinate: number,
  screenBlockCount: number,
  allBlockCount: number
) => {
  const coordinateStart =
    middleCoordinate -
    allBlockCount * Math.ceil(screenBlockCount / 2) -
    Math.floor(screenBlockCount / 2);

  return coordinateStart;
};

// // 真ん中を算出する
// const getMiddleCoordinate = (
//   startCoordinate: number,
//   screenBlockCount: number
// ): number => {
//   return (
//     startCoordinate +
//     screenBlockCount * Math.floor(screenBlockCount / 2) +
//     screenBlockCount * Math.ceil(screenBlockCount / 2)
//   );
// };

const getScreenFieldBlocks = (
  screenBlockCount: number,
  allBlockCount: number,
  coordinateStart: number
): number[] => {
  const blocks = [];
  for (let y = 0; y < screenBlockCount; y++) {
    const startPoint = Math.floor(
      (coordinateStart + allBlockCount * y) / allBlockCount
    );
    const blockRangeStart = startPoint * allBlockCount;
    const blockRangeEnd = (startPoint + 1) * allBlockCount;
    for (let x = 0; x < screenBlockCount; x++) {
      const coordinate = coordinateStart + allBlockCount * y + x;

      const isValid =
        coordinate > blockRangeStart && coordinate <= blockRangeEnd;

      blocks.push(isValid ? coordinate : 0);
    }
  }
  return blocks;
};

const getAllBlockMiddleCoordinate = (allBlockCount: number) => {
  return Math.floor(allBlockCount ** 2 / 2) + Math.floor(allBlockCount / 2);
};

export default function Walk() {
  const [currentCoordinateStart, setCurrentCoordinateStart] =
    useState<number>(0);
  const [currentMiddleCoordinate, setCurrentMiddleCoordinate] =
    useState<number>(getAllBlockMiddleCoordinate(allBlockCount));

  const [currentScreenFieldBlocks, setCurrentScreenFieldBlocks] = useState<
    number[]
  >([]);

  useEffect(() => {
    setCurrentCoordinateStart(
      getStartCoordinate(
        currentMiddleCoordinate,
        screenBlockCount,
        allBlockCount
      )
    );
  }, [currentMiddleCoordinate]);

  useEffect(() => {
    setCurrentScreenFieldBlocks(
      getScreenFieldBlocks(
        screenBlockCount,
        allBlockCount,
        currentCoordinateStart
      )
    );
    console.log("result");
    console.log(currentCoordinateStart, "currentCoordinateStart ok");
    console.log(currentMiddleCoordinate, "currentMiddleCoordinate ok");
    console.log(currentScreenFieldBlocks, "currentScreenFieldBlocks");
    console.log(allFieldBlocks, "allFieldBlocks");
  }, [currentCoordinateStart]);

  const onLeft = () => {
    const canLeft = currentMiddleCoordinate % allBlockCount !== 1;

    if (canLeft) {
      setCurrentMiddleCoordinate(currentMiddleCoordinate - 1);
    }
  };

  const onRight = () => {
    const canRight = currentMiddleCoordinate % allBlockCount !== 0;
    if (canRight) {
      setCurrentMiddleCoordinate(currentMiddleCoordinate + 1);
    }
  };

  const onTop = () => {
    const canTop = currentMiddleCoordinate >= allBlockCount;
    console.log(canTop);
    if (canTop) {
      setCurrentMiddleCoordinate(currentMiddleCoordinate - allBlockCount);
    }
  };

  const onBottom = () => {
    const next = currentMiddleCoordinate + allBlockCount;
    const canBottom = next < allBlockCount ** 2;
    if (canBottom) {
      setCurrentMiddleCoordinate(next);
    }
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{ textAlign: "center", verticalAlign: "middle" }}
    >
      {currentScreenFieldBlocks.map((block, index) => {
        return (
          //   <Grid xs={0.7}>
          <Grid xs={1.5} key={index}>
            <Box
              sx={{
                color: currentMiddleCoordinate === block ? "red" : "black",
              }}
            >
              {block}
            </Box>
          </Grid>
        );
      })}
      <button onClick={onLeft}>left</button>
      <button onClick={onRight}>right</button>
      <button onClick={onTop}>top</button>
      <button onClick={onBottom}>bottom</button>
    </Grid>
  );
}
