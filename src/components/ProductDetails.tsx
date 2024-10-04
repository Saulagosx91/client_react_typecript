import { Link, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils/formats"
import { deleteProduct } from "../services/product"

type Props = {
  product: Product
}

export async function action({ params }: ActionFunctionArgs) {
  if (params.id) {
    await deleteProduct(+params.id);
  }

  return redirect('/')
}

export function ProductDetails({ product }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('¿Estás seguro que quieres eliminar este producto?')) {
      e.preventDefault();
    }
  }

  const fetcher = useFetcher();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800 text-center">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${product.availability ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold
              w-full border boder-black-100 cursor-pointer`}
          >
            {product.availability ? 'Disponible' : 'No Disponible'}
          </button>
        </fetcher.Form>

      </td>
      <td className="py-3 text-lg text-gray-800 text-center">
        <div className="flex gap-2 items-center">
          <Link
            to={`/productos/${product.id}/editar`}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-500"
          >Editar</Link>
          <Form
            className="w-full"
            method="POST"
            onSubmit={handleSubmit}
            action={`/productos/${product.id}/eliminar`}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-500 cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  )
}
