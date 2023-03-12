import { Block, FieldObject } from "@/config/types";
import { zIndex } from "@/config/style";
import { Box } from "@mui/material";
import Image from "next/image";

type Props = {
  object: FieldObject;
};

export const FieldObjectImage: React.FC<Props> = ({ object }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: zIndex.object,
      }}
    >
      <Image
        src={object.url}
        alt={object.alt}
        width={32 * (object.widthUnit != null ? object.widthUnit : 1)}
        height={32 * (object.heightUnit != null ? object.heightUnit : 1)}
      />
    </Box>
  );
};
