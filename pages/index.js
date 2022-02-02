import { getData } from '../utils/fetchData'
import { useContext, useState } from 'react'

import Head from 'next/head'
import ProductItem from '../components/product/ProductItem'
import { DataContext } from '../store/GlobalState'


const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  const [isChecked, setIsChecked] = useState(false)

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const handleCheck = (id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })

    setProducts([...products])
  }

  const handleCheckAll = () => {
    products.forEach(product => product.checked = !isChecked)
    setProducts([...products])
    setIsChecked(!isChecked)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked) {
        deleteArr.push({
          data: '', 
          id: product._id, 
          title: 'Delete all selected products?', 
          type: 'DELETE_PRODUCT'
        })
      }
    })
    dispatch({ type: 'ADD_MODAL',
      payload: deleteArr })
  }

  return(
    <div className="home_page container">
    
      <Head>
          <title>Morning Rituals Soap</title>
      </Head>

      <div>
          <h2>Handcrafted with Simple Ingredients</h2>
          <p>We craft our soap in a variety of coffee shop scents and other pleasing fragrances. 
            Coffee soap used in the shower may help to reduce the appearance of cellulite, redness, acne and dark circles. 
            It&apos;s also great in the kitchen to remove food odors and for use after gardening.</p>
        
          
          <hr />
      
      

      {
        auth.user && auth.user.role === 'admin' && 
        <div className='delete_all btn btn-danger mt-2 mb-4' style={{marginBottom: '-10px'}}>
          <input type="checkbox" checked={isChecked} onChange={handleCheckAll} 
            style={{width: '25px', height: '25px', transform: 'translateY(8px)' }} />
            <button className='btn btn-danger ml-2' 
              data-toggle="modal" data-target="#exampleModal" 
              onClick={handleDeleteAll}>
              DELETE ALL
            </button>
        </div>
      }
  
      
          <h4>Featured Soaps</h4>
            <div className='products' >
              
              {
                products.length === 0 ? 
                <h2>No Products</h2>
                : products.map(product => (
                  
                  <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
                
                ))
              }
            </div>
  


            </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getData('product')
  //server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home