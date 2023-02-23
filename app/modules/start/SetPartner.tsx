import { Scene } from "@/pages/start";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/hooks";
import { Partner, setPartner } from "../../stores/playerSlices";
import { nameSchema } from "../../config/schema";
import { selectablePartnerIds } from "@/config";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";

type Props = {
  setScene: Dispatch<SetStateAction<Scene>>;
};

const schema = yup
  .object<Partner>({
    id: yup.mixed().oneOf(selectablePartnerIds),
    nickname: nameSchema,
  })
  .required();

export const SetPartner: React.FC<Props> = ({ setScene }) => {
  const dispatch = useAppDispatch();
  const pokemons = useFetchPokemons(selectablePartnerIds);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Partner>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(setPartner(data));
    setScene("greeting");
  });

  return (
    <>
      {pokemons.map((p) => (
        <p key={p?.id}>{p?.name}</p>
      ))}
      <h2>最初のパートナーを教えてください。</h2>
      <form onSubmit={onSubmit}>
        <input {...register("id")} />
        <input {...register("name")} />
        <input {...register("nickname")} />
        <p>{errors.nickname?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
};
