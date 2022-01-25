import React, {useState} from 'react'
import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'

function Products(props) {
    const [products, setProducts] = useState(props.products)
    return (
        <React.Fragment>
          <div className='container' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem' }}>
            <h1 className='xs-12'>Soap</h1>
            <hr/>
              <div className='products'>
                {
                products.length === 0 ? 
                <h2>No Products</h2>
                : products.map(product => (
                    <ProductItem key={product._id} product={product} />
                ))
                }
            </div>
          </div>
        </React.Fragment>
        
      
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

export default Products
