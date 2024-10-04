import { safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import { toBoolean } from "../utils/formats";

const { VITE_API_URL } = import.meta.env;

type ProductData = {
  [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price
    });

    if (result.success) {
      const url = `${VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price
      });

    }
    throw new Error('Error. Could not POST the product');

  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const { data } = await axios(`${VITE_API_URL}/api/products`);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output
    }

    throw new Error('Error. Could not GET products');

  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product['id']) {
  try {
    const { data } = await axios(`${VITE_API_URL}/api/products/${id}`);
    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output
    }

    throw new Error('Error. Could not GET the product');

  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString())
    });

    if (result.success) {
      const url = `${VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }

  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product['id']) {
  try {
    await axios.delete(`${VITE_API_URL}/api/products/${id}`);
    
  } catch (error) {
    console.log(error);
  }
}

export async function changeAvailability(id: Product['id']) {
  try {
    await axios.patch(`${VITE_API_URL}/api/products/${id}`);
  } catch (error) { 
    console.log(error);
  }
}