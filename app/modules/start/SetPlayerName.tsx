import { Scene } from "@/pages/start";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/hooks";
import { setName } from "../../stores/playerSlices";
import { nameSchema } from "../../config/schema";

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
    register,
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
    <>
      <h2>はじめにあなたの名前を教えてください</h2>
      <form onSubmit={onSubmit}>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
};
