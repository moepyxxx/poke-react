import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Coordinate, Field } from "@/config/field";
import { FieldContainer } from "@/modules/field/FieldContainer";
import { Direction } from "./FieldContainer";

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

type Props = {
  field: Field;
  screenBlockCount: number;
  allBlockCount: number;
};

export const WalkField: React.FC<Props> = ({
  field,
  screenBlockCount,
  allBlockCount,
}) => {
  const initMiddleCoordinate: Coordinate = {
    x: Math.ceil(allBlockCount / 2),
    y: Math.ceil(allBlockCount / 2),
  };
  const initStartCoordinate: Coordinate = {
    x: initMiddleCoordinate.x - Math.floor(screenBlockCount / 2),
    y: initMiddleCoordinate.y - Math.floor(screenBlockCount / 2),
  };

  const [currentStartCoordinate, setCurrentStartCoordinate] =
    useState<Coordinate>(initStartCoordinate);

  const [currentMiddleCoordinate, setCurrentMiddleCoordinate] =
    useState<Coordinate>(initMiddleCoordinate);

  const [currentScreenFieldBlocks, setCurrentScreenFieldBlocks] = useState<
    Coordinate[]
  >([]);

  const [heroDirection, setHeroDirection] = useState<Direction>("below");

  useEffect(() => {
    setCurrentStartCoordinate({
      x: currentMiddleCoordinate.x - Math.floor(screenBlockCount / 2),
      y: currentMiddleCoordinate.y - Math.floor(screenBlockCount / 2),
    });
  }, [currentMiddleCoordinate]);

  useEffect(() => {
    setCurrentScreenFieldBlocks(
      getScreenFieldBlocks(currentStartCoordinate, screenBlockCount)
    );
  }, [currentStartCoordinate]);

  const onLeft = () => {
    if (heroDirection !== "left") {
      setHeroDirection("left");
      return;
    }

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
    if (heroDirection !== "right") {
      setHeroDirection("right");
      return;
    }

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

  const onAbove = () => {
    if (heroDirection !== "above") {
      setHeroDirection("above");
      return;
    }

    const canAbove =
      currentMiddleCoordinate.y - 1 > Math.floor(screenBlockCount / 2);

    if (canAbove) {
      setCurrentMiddleCoordinate({
        x: currentMiddleCoordinate.x,
        y: currentMiddleCoordinate.y - 1,
      });
    }
  };

  const onBelow = () => {
    if (heroDirection !== "below") {
      setHeroDirection("below");
      return;
    }

    const canBelow =
      currentMiddleCoordinate.y + 1 <=
      allBlockCount - Math.floor(screenBlockCount / 2);

    if (canBelow) {
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
      <button onClick={onAbove}>top</button>
      <button onClick={onBelow}>bottom</button>
    </Grid>
  );
};
