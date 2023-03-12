import { Coordinate, Field } from "@/config/types";
import { Box } from "@mui/material";
import { isEqual } from "lodash-es";
import { FieldObjectImage } from "./FieldObjectImage";
import { FieldTypeImage } from "./FieldTypeImage";

export type Direction = "left" | "right" | "above" | "below";

type Props = {
  currentCoordinate: Coordinate;
  middleCoordinate: Coordinate;
  field: Field;
  heroDirection: Direction;
};

export const FieldContainer: React.FC<Props> = ({
  currentCoordinate,
  middleCoordinate,
  field,
  heroDirection,
}) => {
  const fieldBlock = field.blocks.find((block) =>
    isEqual(block.coordinate, currentCoordinate)
  );

  const isHero = isEqual(currentCoordinate, middleCoordinate);

  if (fieldBlock == null) {
    return <></>;
  }

  if (isHero)
    return (
      <Box
        sx={{
          width: 32,
          height: 32,
          padding: 0,
          position: "relative",
        }}
      >
        <FieldTypeImage
          block={fieldBlock}
          hero={{ isHeroCurrent: true, direction: heroDirection }}
        />
        {fieldBlock.object ? (
          <FieldObjectImage object={fieldBlock.object} />
        ) : (
          <></>
        )}
      </Box>
    );

  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        padding: 0,
        position: "relative",
      }}
    >
      <FieldTypeImage block={fieldBlock} />
      {fieldBlock.object ? (
        <FieldObjectImage object={fieldBlock.object} />
      ) : (
        <></>
      )}
    </Box>
  );
};
