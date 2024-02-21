import {  useEffect, useState } from "react";
import { FaShopify } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useCarrito } from "../../Context/CarritoContext";
export const NavBar = ({ productos }) => {
  console.log(productos)
  
  const [openCarrito, setOpenCarrito] = useState(false)
  
  const { productoCarrito, setProductoCarrito} = useCarrito();

  const openCarritoHandle = () =>{
    setOpenCarrito(!openCarrito)
  }

  useEffect(() => {
  console.log(productoCarrito)
  }, [productoCarrito])
  
  const getTotalPrice = () =>{
    return productoCarrito.reduce((total,producto)=> total + producto.price* producto.cantidad,0)
  }

  const eliminarProducto = (productoId)=>{
    const updateProduct = productoCarrito.filter((product)=>product.id !== productoId)
    setProductoCarrito(updateProduct)
    console.log(updateProduct)
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
    <div className="container">
      <a className="navbar-brand text-uppercase fs-1" href="#">ShopTime
      <FaShopify/>
      </a>
      <div>
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item">
            <a className="nav-link mx-2 active" aria-current="page" href="#">
            <FaCartShopping
             onClick={openCarritoHandle}
            className="navbarIcon fs-2" />
            </a>
            <span className="span">{productoCarrito.length}</span>
          </li>
      <div className={`carrito-container ${openCarrito ? "carrito-container text-black p-2" : "none"}`}>
       {productoCarrito.length === 0 ? (
        <span className="d-flex justify-content-center">Aun no hay productos</span>
       ): (
        <div>
          {productoCarrito.map((producto) => (
           <div className="productocarritos" key={producto.id}>
           <div className="d-flex justify-content-between align-items-center p-2 gap-3">
              <span className="producto-span">{producto.cantidad}</span>
             <li className="producto-title">{producto.title}</li>
              <p className="m-0">{`$${producto.price.toFixed(2)}`}</p>
              <IoMdClose 
              className="producto-icon"
              onClick={()=>eliminarProducto(producto.id)}/>
           </div>
           <hr />
           </div>
         ))}
         <div>
         <div className="d-flex justify-content-between align-items-center p-1">
           <span className="p-2 fs-5">Total : </span>
           <span className="fs-5">{`$${getTotalPrice().toFixed(2)}`}</span>
         </div>
         </div>
        </div>
       )}
      </div>
        </ul>
      </div>
      
    </div>
    </nav> 
  )
}
