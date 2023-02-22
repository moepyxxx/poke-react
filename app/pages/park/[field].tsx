import { useRouter } from "next/router";

export default function Field() {
  const router = useRouter();
  const { field } = router.query;

  return (
    <>
      <main></main>
    </>
  );
}
