import { Product } from "../types";

type Props = {
  product?: Product
}

export function ProductForm({ product } : Props) {

  return (
    <>
      <div className="mb-4">
        <label
          className="text-gray-800"
          htmlFor="name"
        >Nombre Producto:</label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Producto"
          name="name"
          defaultValue={product ? product.name : ''} 
        />
      </div>
      <div className="mb-4">
        <label
          className="text-gray-800"
          htmlFor="price"
        >Precio:</label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={product ? product.price : ''}
        />
      </div>

      {
        product && <AvailabilityField product={product}/>
      }

      <input
        type="submit"
        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
        value="Registrar Producto"
      />
    </>
  )
}

const availabilityOptions = [
  { name: 'Disponible', value: true},
  { name: 'No Disponible', value: false}
];

function AvailabilityField({ product } : { product : Product }) {
  return (
    <div className="mb-4">
        <label
            className="text-gray-800"
            htmlFor="availability"
        >Disponibilidad:</label>
        <select 
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
        >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
        </select>
    </div>
  )
}