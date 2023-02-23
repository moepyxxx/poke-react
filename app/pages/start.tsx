import { useAppDispatch } from "hooks";
import { setName } from "../stores/playerSlices";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  name: string;
};

const schema = yup
  .object<FormData>({
    name: yup
      .string()
      .min(1, "最小1文字です")
      .max(5, "最大5文字です")
      .matches(/^[ァ-ヶ]+$/i, "カタカナだけ利用できます")
      .required("必須です"),
  })
  .required();

export default function Start() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(setName(data.name));
    router.push("/");
  });

  return (
    <>
      <div>はじめから</div>
      <br />

      <form onSubmit={onSubmit}>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
}
