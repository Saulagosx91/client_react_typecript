import {
  string,
  number,
  object,
  boolean,
  InferOutput,
  array
} from "valibot";


export const DraftProductSchema = object({
  name: string(),
  price: number()
});

export const ProductSchema = object({
  availability: boolean(),
  id: number(),
  name: string(),
  price: number()
});

export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>