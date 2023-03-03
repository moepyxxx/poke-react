import { Scene } from "@/pages/start";
import { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/hooks";
import { setName } from "../../stores/saveSlices";
import { nameSchema } from "../../config/schema";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { positionCenter } from "@/pages/_app";

type Props = {
  setScene: Dispatch<SetStateAction<Scene>>;
};

type FormData = {
  name: string;
};

const schema = yup
  .object<FormData>({
    name: nameSchema,
  })
  .required();

export const SetPlayerName: React.FC<Props> = ({ setScene }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(setName(data.name));
    setScene("greeting");
  });

  return (
    <Box sx={{ ...positionCenter }}>
      <form onSubmit={onSubmit}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} helperText={errors.name?.message} />
          )}
        />
        <Box sx={{ mt: 1 }}>
          <Button variant="contained" type="submit">
            決定
          </Button>
        </Box>
      </form>
    </Box>
  );
};
