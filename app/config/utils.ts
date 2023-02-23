export const parseJPPokemonName = (name: string): string => {
  switch (name) {
    case "chikorita":
      return "チコリータ";
    case "cyndaquil":
      return "ヒノアラシ";
    case "totodile":
      return "ワニノコ";
    default:
      return "ピカチュウ";
  }
};
