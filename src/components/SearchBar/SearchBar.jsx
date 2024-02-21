import { CiSearch } from "react-icons/ci"

export const SearchBar = ({ handleSubmit, inputValue, handleChange, handleClickSearch}) => {
  return (
    
    <form className='form mt-5' onSubmit={handleSubmit}>  
      <input className='input'
      placeholder='Search...'
      type="text"
      value={inputValue}
      onChange={handleChange}
      />
      <CiSearch type='submit'
      onClick={handleClickSearch}
      className='input-icon'></CiSearch>
    </form>
  )
}


