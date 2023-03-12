import { zIndex } from "@/config/style";
import { Box } from "@mui/material";
import Image from "next/image";
import { Direction } from "./FieldContainer";

type Props = {
  direction: Direction;
};

export const FieldHeroImage: React.FC<Props> = ({ direction }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: zIndex.hero,
      }}
    >
      <Image
        src={`/images/hero/boy-${direction}.gif`}
        alt="主人公"
        width={32}
        height={32}
      />
    </Box>
  );
};
