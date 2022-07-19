import { ProductType } from "types";

export type ProductByCategoryType = Pick<
  ProductType,
  | "id"
  | "name"
  | "description"
  | "subDescription"
  | "formattedPrice"
  | "imgList"
  | "sale"
  | "new"
>;
