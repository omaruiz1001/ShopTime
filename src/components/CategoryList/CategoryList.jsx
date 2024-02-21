export const CategoryList = ({categorias, setCategorias}) => {

  const handleClickAll = () =>{
    setCategorias("") 
  }

  return (
    <div className='col-md-2 col-12 order-1 order-md-2'>
      <div className='category-container p-2'>
        <h3 className='p-1'>Categorias:</h3>
        <div className="categorys-btns d-flex flex-column gap-2 p-1">
        <div className='categorys' onClick={handleClickAll}>
        <li className={categorias === "" ? "selected" : ""}>All</li>
        </div>
        <div className='categorys' onClick={() => setCategorias("electronics")}>
          <li className={categorias === "electronics" ? "selected" : ""}>Electrónica</li></div>
        <div className='categorys' onClick={() => setCategorias("jewelery")}>
        <li className={categorias === "jewelery" ? "selected" : ""}>Joyeria</li>
          </div>
        <div className='categorys' onClick={() => setCategorias("men's clothing")}>
          <li className={categorias === "men's clothing" ? "selected" : ""}>Ropa de Hombre</li>
          </div>
        <div className='categorys' onClick={() => setCategorias("women's clothing")}>
          <li className={categorias === "women's clothing" ? "selected" : ""}>Ropa de Mujer</li>
          </div>
      </div>
      </div>
     </div>
  )
}
