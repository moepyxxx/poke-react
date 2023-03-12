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
import { ActionEvent } from "@/config/types";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  name: string;
};

const schema = yup
  .object<FormData>({
    name: nameSchema,
  })
  .required();

type Props<T, U> = {
  nextEvent: ActionEvent<T, U>["event"];
  setActionEvent: Dispatch<SetStateAction<ActionEvent<T, U> | null>>;
};

export const SetPlayerName = <T, U>(
  props: React.PropsWithChildren<Props<T, U>>
) => {
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
    props.setActionEvent({
      uuid: uuidv4(),
      event: props.nextEvent,
    });
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
