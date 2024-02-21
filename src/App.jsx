import { useState, useEffect } from 'react'
import './App.css'
import { ProductCard } from './components/ProductCard/ProductCard';
import { IoCloseOutline } from "react-icons/io5";
import { SearchBar } from './components/SearchBar/SearchBar';
import { CategoryList } from './components/CategoryList/CategoryList';
import { NavBar } from './components/Header/NavBar';
import { Footer } from './components/Footer/Footer';

function App() {

  const [productos, setProductos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [originProduct, setOriginProduct] = useState([])
  const [categorias, setCategorias] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openModal = (product) => {
    console.log("Opening modal with product:", product);
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  
  const getFetch =  async (category = "") => {
    try{
    const apiUrl = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products"

    const response = await fetch(apiUrl)
    if(!response.ok){
      throw new Error(`Error en la solicitud: ${response.statusText}`)
    }
    const data = await response.json()
    setProductos(data)
    setOriginProduct(data)
    } catch(error){
    console.error("Error",error)
    }
  }
   
  useEffect(() => {
    getFetch()
  },[])
   
  useEffect(() => {
    getFetch(categorias)
  },[categorias])

  useEffect(() => {
    if (modalOpen && selectedProduct) {
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    }
  }, [modalOpen, selectedProduct]);
  
  const handleChange = (e) =>{
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(inputValue.length === 0){
      setProductos(originProduct)
    } else {
      const filteredProducts = productos.filter(producto =>
        producto.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        setProductos(filteredProducts)
    }
  }

  const handleClickSearch = ()=>{
    if(inputValue.length === 0){
      setProductos(originProduct)
    } else {
      const filteredProducts = productos.filter(producto =>
        producto.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        setProductos(filteredProducts)
        setCategorias("")
    }
  }

  

  const { title, description, price, category, image } = selectedProduct || {};

  return (
    <>
     <NavBar productos={productos}/>
    <div className='container'>
    <div className='mt-5 d-flex justify-content-start gap-2'>
      <SearchBar
      inputValue={inputValue}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleClickSearch={handleClickSearch}
      />
    </div>
   <div className='row mt-5'>
     <div className='col-md-10 col-12 order-2 order-md-1 grid mt-md-0 mt-4'>
      {productos && productos.length > 0 
      && productos.map((producto, index)=>(
       <ProductCard 
       key={index} 
       producto={producto} 
       openModal={openModal}/>
        ))}
     </div>
     {modalOpen && selectedProduct &&  (
      <div className={`modal fade ${modalOpen ? "show" : ""}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
        <div className='d-flex flex-column'>
          <div className='text-center'>
            <img className='img-modal' src={image} alt="" />
          </div>
          <div className='info-container d-flex flex-column'>
           <div className='text-title mt-4 text-start'>{title}</div>
           <p className='text-description'>{description}</p>
            <div className="d-flex justify-content-between mt-2 fs-5 movilsmall">
              <div className='text-category text-start text-capitalize'>{category}</div>
              <span className="text-primary">${price}</span>
            </div>
            <div className='d-flex justify-content-center'>
              <IoCloseOutline
              onClick={closeModal}
              data-bs-dismiss="modal"
              className='icon'/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
      )}
     <CategoryList categorias={categorias} setCategorias={setCategorias}/>
   </div>
   </div>
   <Footer/>
   </>
  )
}

export default App
