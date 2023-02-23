import * as yup from "yup";

export const nameSchema = yup
  .string()
  .min(1, "最小1文字です")
  .max(5, "最大5文字です")
  .matches(/^[ァ-ヶ]+$/i, "カタカナだけ利用できます")
  .required("必須です");
