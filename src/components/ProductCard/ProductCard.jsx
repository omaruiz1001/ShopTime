import { memo } from "react"
import { useCarrito } from "../../Context/CarritoContext"
export const ProductCard = memo (({ producto , openModal }) => {
  
  const { carritohandle } = useCarrito();
  return (
    <div className='grid-card'>
    <img onClick={()=>openModal(producto)}
    className='product-img'
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    src={producto.image} alt={producto.description} 
    role="button"
    tabIndex="0"
    />
    <div>
      <div className='producto-title mt-4 text-start'>{producto.title}</div>
      <div className="d-flex justify-content-between mt-2 align-items-center">
        <div className='text-category text-start text-capitalize'>{producto.category}</div>
        <span className="text-primary fs-5">${producto.price}</span>
      </div>
      <div 
      onClick={()=>carritohandle(producto)}
      className="d-flex justify-content-center carrito mt-3">
        <p className="text-center mt-3">Agregar al carrito </p>
      </div>
    </div>

    </div>
  )
})
