import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [productoCarrito, setProductoCarrito] = useState([]);

  const carritohandle = (producto) => {
    const productoExistenteIndex = productoCarrito.findIndex(
      (item) =>item.id === producto.id);
    if(productoExistenteIndex !==-1){
    const nuevoCarrito = [...productoCarrito];
    nuevoCarrito[productoExistenteIndex].cantidad += 1;
    setProductoCarrito(nuevoCarrito)
    } else {
      setProductoCarrito((prevCarrito) => [...prevCarrito,{...producto, cantidad:1}]);
    }
  };

  return (
    <CarritoContext.Provider value={{ productoCarrito, carritohandle,setProductoCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
  }
  return context;
};

