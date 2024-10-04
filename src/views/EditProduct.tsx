import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData
} from "react-router-dom";
import { ProductForm } from "../components/ProductForm"
import { ErrorMessage } from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/product";
import { Product } from "../types";


export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect('/');
    }
    return product;
  }

}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
    return error;
  }

  if (params.id) {
    await updateProduct(data, +params.id)
    return redirect('/');
  }
}

export function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
        <Link
          to='/'
          className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          Volver a Productos
        </Link>
      </div>

      <Form
        className="mt-10"
        method="POST"
      >
        <ProductForm product={product} />
      </Form>
      {
        error && <ErrorMessage>{error}</ErrorMessage>
      }
    </>
  )
}
