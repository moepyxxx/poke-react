import { parkLocalStorageName } from "@/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [park, setPark] = useLocalStorage(parkLocalStorageName, null);

  useEffect(() => {
    // TOPに来た時点でparkのデータが残ってたらゴミなので削除
    if (park) {
      setPark(null);
    }

    // TODO: セーブデータがあればその場所から、とかしたい
    router.push("/field/in_front_of_safari_park");
  }, []);
  return <></>;
}
