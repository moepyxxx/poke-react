import { Block } from "@/config/types";
import { zIndex } from "@/config/style";
import { Box } from "@mui/material";
import Image from "next/image";
import { Direction } from "./FieldContainer";
import { FieldHeroImage } from "./FieldHeroImage";

type Props = {
  block: Block;
  hero?: {
    isHeroCurrent: boolean;
    direction: Direction;
  };
};

export const FieldTypeImage: React.FC<Props> = ({ block, hero }) => {
  switch (block.fieldType) {
    case "grass":
      return (
        <Box
          sx={{ position: "absolute", top: 0, left: 0, zIndex: zIndex.field }}
        >
          <Image
            src="/images/object/grass.svg"
            alt="草むら"
            width={32}
            height={32}
          />
          {hero?.isHeroCurrent ? (
            <FieldHeroImage direction={hero?.direction} />
          ) : (
            <></>
          )}
        </Box>
      );
    case "nothing":
      return (
        <Box
          sx={{ position: "absolute", top: 0, left: 0, zIndex: zIndex.field }}
        >
          <Image
            src="/images/object/black.svg"
            alt="何もないエリア"
            width={32}
            height={32}
          />
        </Box>
      );
    default:
      return <></>;
  }
};
