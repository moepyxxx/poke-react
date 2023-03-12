import { Block, Field } from "./types";

export const createFieldInFrontOfSafariPark = (
  allBlockCount: number
): Field => {
  const blocks: Block[] = [];

  // y 1~8 何もない
  for (let y = 1; y <= 8; y++) {
    const nothingFields: Block[] = Array.from(
      new Array(allBlockCount),
      (_, i) => {
        return {
          coordinate: {
            x: i + 1,
            y,
          },
          fieldType: "nothing",
        };
      }
    );
    blocks.push(...nothingFields);
  }

  // y 9~11 森object
  for (let y = 9; y <= 11; y++) {
    // 1~8 何もないエリア
    for (let x = 1; x <= 8; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "nothing",
      });
    }
    // 9~32 森object
    for (let x = 9; x <= 32; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "grass",
        object: {
          url: "/images/object/tree.svg",
          alt: "森",
        },
      });
    }
    // 33~40 何もないエリア
    for (let x = 33; x <= 40; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "nothing",
      });
    }
  }

  // y 12~29 object色々
  for (let y = 12; y <= 29; y++) {
    // 1~8 何もないエリア
    for (let x = 1; x <= 8; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "nothing",
      });
    }

    // x 9~11 森object
    for (let x = 9; x <= 11; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "grass",
        object: {
          url: "/images/object/tree.svg",
          alt: "森",
        },
      });
    }

    // 12~29
    switch (y) {
      // 4, 10, 11
      default:
        for (let x = 12; x <= 29; x++) {
          blocks.push({
            coordinate: {
              x,
              y,
            },
            fieldType: "grass",
          });
        }
        break;
    }

    // x 30~32 森object
    for (let x = 30; x <= 32; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "grass",
        object: {
          url: "/images/object/tree.svg",
          alt: "森",
        },
      });
    }

    // x 33~40 何もないエリア
    for (let x = 33; x <= 40; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "nothing",
      });
    }
  }

  // y 30~32 森object
  for (let y = 30; y <= 32; y++) {
    // 1~8 何もないエリア
    for (let x = 1; x <= 8; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "nothing",
      });
    }
    // 9~32 森object
    for (let x = 9; x <= 32; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "grass",
        object: {
          url: "/images/object/tree.svg",
          alt: "森",
        },
      });
    }
    // 33~40 何もないエリア
    for (let x = 33; x <= 40; x++) {
      blocks.push({
        coordinate: {
          x,
          y,
        },
        fieldType: "nothing",
      });
    }
  }

  // y 33~40 何もない
  for (let y = 33; y <= 40; y++) {
    const nothingFields: Block[] = Array.from(
      new Array(allBlockCount),
      (_, i) => {
        return {
          coordinate: {
            x: i + 1,
            y,
          },
          fieldType: "nothing",
        };
      }
    );
    blocks.push(...nothingFields);
  }

  if (blocks.length !== allBlockCount * allBlockCount) {
    throw new Error("ブロック数がおかしいですん");
  }

  return {
    fieldName: "サファリパーク前",
    blocks,
  };
};
