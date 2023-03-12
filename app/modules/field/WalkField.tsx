import Grid from "@mui/material/Unstable_Grid2";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActionEvent, Coordinate, Field } from "@/config/types";
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

type Props<T, U> = {
  field: Field;
  screenBlockCount: number;
  allBlockCount: number;
  actionEvent: ActionEvent<T, U> | null;
  setActionEvent: Dispatch<SetStateAction<ActionEvent<T, U> | null>>;
};

export const WalkField = <T, U>(
  props: React.PropsWithChildren<Props<T, U>>
) => {
  const initMiddleCoordinate: Coordinate = {
    x: Math.ceil(props.allBlockCount / 2),
    y: Math.ceil(props.allBlockCount / 2),
  };
  const initStartCoordinate: Coordinate = {
    x: initMiddleCoordinate.x - Math.floor(props.screenBlockCount / 2),
    y: initMiddleCoordinate.y - Math.floor(props.screenBlockCount / 2),
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
    if (!props.actionEvent) return;

    switch (props.actionEvent.event) {
      case "pushLeft":
        onLeft();
        break;
      case "pushBelow":
        onBelow();
        break;
      case "pushRight":
        onRight();
        break;
      case "pushAbove":
        onAbove();
        break;
    }
  }, [props.actionEvent]);

  useEffect(() => {
    setCurrentStartCoordinate({
      x: currentMiddleCoordinate.x - Math.floor(props.screenBlockCount / 2),
      y: currentMiddleCoordinate.y - Math.floor(props.screenBlockCount / 2),
    });
  }, [currentMiddleCoordinate]);

  useEffect(() => {
    setCurrentScreenFieldBlocks(
      getScreenFieldBlocks(currentStartCoordinate, props.screenBlockCount)
    );
  }, [currentStartCoordinate]);

  const onLeft = () => {
    if (heroDirection !== "left") {
      setHeroDirection("left");
      return;
    }

    const canLeft =
      currentMiddleCoordinate.x - 1 > Math.floor(props.screenBlockCount / 2);

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
      props.allBlockCount - Math.floor(props.screenBlockCount / 2);

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
      currentMiddleCoordinate.y - 1 > Math.floor(props.screenBlockCount / 2);

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
      props.allBlockCount - Math.floor(props.screenBlockCount / 2);

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
              field={props.field}
              heroDirection={heroDirection}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
