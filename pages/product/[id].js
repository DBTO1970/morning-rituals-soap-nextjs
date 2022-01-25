/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import {DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'


const ProductDetail = (props) => {
    const [product] = useState(props.product)
    const images = [product.image, product.Alt1, product.Alt2]
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const router = useRouter()

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }
   
    return (
        <div className='row detail_page' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem'}}>
            <Head>
                <title>Product Details</title>
            </Head>
            <div className='col-md-6'>
                <img src={product.images[tab].url} alt={product.images[tab].url} className='d-block img-thumbnail rounded mt-4 w-100' style={{height: '350px'}} />
                
                <div className='row mx-0' style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img.url} 
                            alt={img.url} 
                            className={`img-thumbnail rounded ${isActive(index)}`} style={{height:'80px', width: '20%'}} 
                            onClick={() => setTab(index)}
                            />
                    ))}
                </div>
            </div>
            <div className='col-md-6'>
                <h1>{product.name}</h1>
                    <h6>{product.description}</h6>
                    <hr />
                <h5>Ingredient List</h5>
                <p>{product.ingredients}</p>
                <hr />
                <div style={{textAlign: 'right'}}>
                    <h6 className="text-dark" >Price: ${product.price} US</h6>
                        {
                            product.inStock > 0 ? 
                            <h6 className="text-danger">In Stock: {product.inStock} </h6> :
                            <div>
                            <h6 className="text-danger"> Out of Stock</h6>
                            {/* <h6 className="text-danger small"> This batch will be ready on {product.dateReady}</h6> */}
                            </div>
                            
                        }
                </div>
                
            <div className="row justify-content-between mx-0" style={{marginTop: '20px'}}>
           
            <Link href={'/products/'}>
                <button className='btn btn-info' 
                    style={{marginRight: '5px', flex: 1}} onClick={() => router.back()}><i className="fas fa-long-arrow-alt-left"></i> Back</button>
            </Link>
            {/* <button><a className='btn btn-info' 
                    style={{marginRight: '5px', flex: 1}}><i className="fas fa-arrow-left" onClick={router.back()}></i> Back</a></button> */}
            <button className='btn btn-success'
                style={{marginLeft: '5px', flex: 1}} 
                disabled={product.inStock === 0 ? true : false }
                onClick={() => dispatch(addToCart(product, cart))} >
                <i 
                    className="fas fa-shopping-basket" 
                    style={{margin: '0 5px'}} 
                    aria-hidden="true" 
                    ></i>  
                Add to Basket
            </button>

        
                </div>
            </div>
            <div>
            
            </div>
        </div>
    )
}


export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
   //server side rendering
    return {
      props: { product: res.product }, // will be passed to the page component as props
    }
  }

export default ProductDetail

