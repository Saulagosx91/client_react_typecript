import { PropsWithChildren } from "react"

export function ErrorMessage({ children } : PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-300 text-red-500 font-bold p-3 uppercase border-red-500 border-l-4 rounded">
      {children}
    </div>
  )
}