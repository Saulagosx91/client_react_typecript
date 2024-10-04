import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import { ProductForm } from "../components/ProductForm"
import { ErrorMessage } from "../components/ErrorMessage";
import { addProduct } from "../services/product";

export async function action({ request } : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  
  let error = '';
  if(Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
    return error;
  }

  await addProduct(data);
  return redirect('/');
}

export function NewProduct() {
  const error = useActionData() as string;

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Nuevo Producto</h2>
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
        <ProductForm />
      </Form>

      {
        error && <ErrorMessage>{error}</ErrorMessage>
      }

    </>
  )
}