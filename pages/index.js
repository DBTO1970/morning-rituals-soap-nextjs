import { getData } from '../utils/fetchData'
import React, { useState } from 'react'

import Head from 'next/head'
import ProductItem from '../components/product/ProductItem'


const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  return(
    <div>
    
      <Head>
        <title>Morning Rituals Soap</title>
      </Head>

      
      <div className='container' >
      <div>
        <h2>Handcrafted with Simple Ingredients</h2>
        <p>We craft our soap in a variety of coffee shop scents and other pleasing fragrances. Coffee soap used in the shower may help to reduce the appearance of cellulite, redness, acne and dark circles. It&apos;s also great in the kitchen to remove food odors and for use after gardening.</p>
      </div>
        
        <hr />
        <h4>Featured Soaps</h4>
          <div className='products' >
            
            {
              products.length === 0 ? 
              <h2>No Products</h2>
              : products.map(product => (
                product.featured === true ? 
                <ProductItem key={product._id} product={product} />
                : <></>
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