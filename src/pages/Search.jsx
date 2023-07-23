import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';



function Search() {

  const navigate = useNavigate()

    const [searchKeyword, setsearchKeyword] = useState('');

    // console.log(searchKeyword);
    const handleSubmit= (w) => {
      w.preventDefault()
      
      searchKeyword.trim() ? navigate(`/products?keyword=${searchKeyword}`) : navigate('/products')

    }

  return (
    <div>
        <form action="" className='m-5 ml-28 ' onSubmit={handleSubmit}>
            <input className='border-2 border-solid border-black' type="text" onChange={(w) => setsearchKeyword(w.target.value)}  placeholder='Search a funtion' />
            <button>Search</button>
        </form>
    </div>
  )
}

export default Search