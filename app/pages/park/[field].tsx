import { Template } from "@/modules/Template";
import { useRouter } from "next/router";

type FieldPath = "kusamura";

const parseFieldName = (path: FieldPath): string => {
  switch (path) {
    case "kusamura":
      return "草むら";
    default:
      return "";
  }
};

export default function Field() {
  const router = useRouter();
  const field = router.query.field as FieldPath;

  return (
    <Template>
      <div>
        <p>現在いる場所：サファリパーク {parseFieldName(field)}</p>
      </div>
    </Template>
  );
}
