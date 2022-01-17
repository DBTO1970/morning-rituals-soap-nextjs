import { getData } from '../utils/fetchData'
import { useState } from 'react'

import Head from 'next/head'

import ProductItem from '../components/product/ProductItem'

const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  return(
    <div className="container" style={{alignItems: 'center', justifyContent: 'center', margin: '2rem'}}>
      <Head>
        <title>Home Page</title>
      </Head>

      {/* <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="..." alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span classNameName="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div> */}
      <div style={{justifyContent: 'center', alignItems: 'center'}} className="item" >
      <h2>Handcrafted with Simple Ingredients</h2>
            <p>We craft our soap in a variety of coffee shop scents and other pleasing fragrances. Coffee soap used in the shower may help to reduce the appearance of cellulite, redness, acne and dark circles. It’s also great in the kitchen to remove food odors and for use after gardening.</p>
            <hr />
      <div className='item'>
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