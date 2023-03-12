import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Coordinate, createFieldInFrontOfSafariPark } from "@/config/field";
import { FieldContainer } from "@/modules/field/FieldContainer";
import { Direction } from "../modules/field/FieldContainer";

const getScreenFieldBlocks = (
  startCoordinate: Coordinate,
  screenBlockCount: number
): Coordinate[] => {
  const blocks: Coordinate[] = [];

  for (let y = 0; y < screenBlockCount; y++) {
    for (let x = 0; x < screenBlockCount; x++) {
      const coordinate = {
        x: startCoordinate.x + x,
        y: startCoordinate.y + y,
      };
      blocks.push(coordinate);
    }
  }
  return blocks;
};

export default function Walk() {
  // 画面上の座標数
  const screenBlockCount = 17;
  // 画面すべての座標数
  const allScreenBlockCount = 24;
  // すべての座標数
  const allBlockCount = allScreenBlockCount + (screenBlockCount - 1);
  // フィールド要素
  const field = createFieldInFrontOfSafariPark(allBlockCount);

  const initMiddleCoordinate: Coordinate = {
    x: Math.ceil(allBlockCount / 2),
    y: Math.ceil(allBlockCount / 2),
  };
  const initStartCoordinate: Coordinate = {
    x: initMiddleCoordinate.x - Math.floor(screenBlockCount / 2),
    y: initMiddleCoordinate.y - Math.floor(screenBlockCount / 2),
  };

  const [currentCoordinateStart, setCurrentCoordinateStart] =
    useState<Coordinate>(initStartCoordinate);

  const [currentMiddleCoordinate, setCurrentMiddleCoordinate] =
    useState<Coordinate>(initMiddleCoordinate);

  const [currentScreenFieldBlocks, setCurrentScreenFieldBlocks] = useState<
    Coordinate[]
  >([]);

  const [heroDirection, setHeroDirection] = useState<Direction>("below");

  useEffect(() => {
    setCurrentCoordinateStart({
      x: currentMiddleCoordinate.x - Math.floor(screenBlockCount / 2),
      y: currentMiddleCoordinate.y - Math.floor(screenBlockCount / 2),
    });
  }, [currentMiddleCoordinate]);

  useEffect(() => {
    setCurrentScreenFieldBlocks(
      getScreenFieldBlocks(currentCoordinateStart, screenBlockCount)
    );
  }, [currentCoordinateStart]);

  const onLeft = () => {
    const canLeft =
      currentMiddleCoordinate.x - 1 > Math.floor(screenBlockCount / 2);

    if (canLeft) {
      setCurrentMiddleCoordinate({
        x: currentMiddleCoordinate.x - 1,
        y: currentMiddleCoordinate.y,
      });
    }
  };

  const onRight = () => {
    const canRight =
      currentMiddleCoordinate.x + 1 <=
      allBlockCount - Math.floor(screenBlockCount / 2);

    if (canRight) {
      setCurrentMiddleCoordinate({
        x: currentMiddleCoordinate.x + 1,
        y: currentMiddleCoordinate.y,
      });
    }
  };

  const onTop = () => {
    const canTop =
      currentMiddleCoordinate.y - 1 > Math.floor(screenBlockCount / 2);

    if (canTop) {
      setCurrentMiddleCoordinate({
        x: currentMiddleCoordinate.x,
        y: currentMiddleCoordinate.y - 1,
      });
    }
  };

  const onBottom = () => {
    const canBottom =
      currentMiddleCoordinate.y + 1 <=
      allBlockCount - Math.floor(screenBlockCount / 2);

    if (canBottom) {
      setCurrentMiddleCoordinate({
        x: currentMiddleCoordinate.x,
        y: currentMiddleCoordinate.y + 1,
      });
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
          <Grid key={index} sx={{ padding: 0 }}>
            <FieldContainer
              currentCoordinate={block}
              middleCoordinate={currentMiddleCoordinate}
              field={field}
              heroDirection={heroDirection}
            />
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
