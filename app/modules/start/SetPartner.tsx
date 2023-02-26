import { Scene } from "@/pages/start";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/hooks";
import { Pokemon } from "../../stores/saveSlices";
import { nameSchema } from "../../config/schema";
import { selectablePartnerIds } from "@/config";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import Image from "next/image";
import { PokeAPIPokemon } from "@/config/types";
import { addPokemons } from "@/stores/localDataSlices";

type Props = {
  setScene: Dispatch<SetStateAction<Scene>>;
};

type FormData = Pick<Pokemon, "id" | "nickname"> & { isNickname: boolean };

const schema = yup
  .object<FormData>({
    id: yup.mixed().oneOf(selectablePartnerIds),
    isNickname: yup
      .string()
      .required()
      .oneOf(["true", "false"])
      .default("true"),
    nickname: yup.string().when("isNickname", {
      is: "true",
      then: () => nameSchema,
      otherwise: (schema) => schema,
    }),
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [currentSelectPartner, setCurrentPartner] = useState<PokeAPIPokemon>();

  useEffect(() => {
    const pokemon = pokemons.find((pokemon) => pokemon.id == watch("id"));
    if (!pokemon) return;
    setCurrentPartner(pokemon);
  }, [watch("id")]);

  const onSubmit = handleSubmit((data) => {
    if (!currentSelectPartner) return;
    dispatch(
      addPokemons([
        {
          id: currentSelectPartner.id,
          name: currentSelectPartner.name,
          nickname: data.nickname,
          isPartner: true,
        },
      ])
    );
    setScene("closingTalk");
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <select
          {...register("id", {
            valueAsNumber: true,
          })}
        >
          {pokemons.map((p) => {
            return (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            );
          })}
        </select>
        <p>{errors.id?.message}</p>
        {currentSelectPartner ? (
          <div>
            <Image
              width="100"
              height="100"
              src={currentSelectPartner.sprites.front_default}
              alt={currentSelectPartner.name}
            />
          </div>
        ) : (
          ""
        )}
        <div>
          <input type="checkbox" value="false" {...register("isNickname")} />
          ニックネームをつけない
          <p>{errors.isNickname?.message}</p>
        </div>
        <div>
          {" "}
          <input {...register("nickname")} />
          <p>{errors.nickname?.message}</p>
        </div>
        <input type="submit" />
      </form>
    </>
  );
};
