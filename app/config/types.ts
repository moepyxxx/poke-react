/**
 * ポケモン関連
 */
export type PokeAPIPokemon = {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
  };
};

/**
 * アクション関係
 */
export type LTRBAction = {
  left: () => void;
  top: () => void;
  right: () => void;
  bottom: () => void;
};

export type ControllerActionType =
  | "pushLeft"
  | "pushRight"
  | "pushAbove"
  | "pushBelow"
  | "pushStart"
  | "pushA"
  | "pushB";

export type ControllerActionEvent = {
  // アクションはTOPコンポーネントのステートで管理するため
  // アクションが変わったことを各子要素に通知する
  // もっと良い方法があったら知りたいポイント
  uuid: string;
  type: ControllerActionType;
};

export type SelectAction<T> = {
  label: string;
  event: T; // あとで？はずす
  // fn: () => void; // 後で削除
  hidden?: boolean;
};

export type PanelAction<T, U> = {
  event?: T;
  quote: string;
  selectableActions?: SelectAction<U>[];
  // nextFn?: () => void;
  nextEvent?: T;
  isNextDisable?: boolean;
  isLastAction?: boolean;
};

export type EventActionList<T extends string> = {
  [k in ControllerActionType | T]: null | (() => void);
};

export type ActionEvent<T, U> = {
  // アクションはTOPコンポーネントのステートで管理するため
  // アクションが変わったことを各子要素に通知する
  // もっと良い方法があったら知りたいポイント
  uuid: string;
  event: T | U | ControllerActionType;
};

/**
 * フィールド関連
 */
export type Block = {
  coordinate: Coordinate;
  fieldType: FieldType;
  object?: FieldObject;
  action?: LTRBAction;
  isScreen?: boolean;
  canPass?: boolean;
};

export type Field = {
  fieldName: string;
  blocks: Block[];
};

export type FieldPath = "kusamura";

export type Coordinate = {
  x: number;
  y: number;
};

export type FieldType = "grass" | "indoor" | "river" | "load" | "nothing";

export type FieldObject = {
  url: string;
  alt: string;
  widthUnit?: number;
  heightUnit?: number;
};
