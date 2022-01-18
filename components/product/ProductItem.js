// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className='btn btn-info' 
                        style={{marginRight: '5px', flex: 1}}><i className="fas fa-info-circle" ></i>  More Info</a>
                </Link>
                <button className='btn btn-success'
                    style={{marginLeft: '5px', flex: 1}} 
                    disabled={product.inStock === 0 ? true : false }
                    onClick={() => dispatch(addToCart(product, cart))} >
                    <i className="fas fa-shopping-basket" style={{margin: '0 5px'}}></i>  
                    Add to Basket
                </button>

            </>
        )
    }
return (
    <React.Fragment>
        <div className="card" >
            <img className="card-img-top" src={product.images[0].url} alt={product.name} style={{borderRadius: '10px'}} />
            <div className="card-body">
                <h5 className="card-title" title={product.name}>{product.name}</h5>
                <div className="row justify-content-between mx-0">
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
                <p className="card-text" title={product.description} >{product.description} </p><br />
                <div className="row justify-content-between mx-0">
                    {userLink()}
                </div>
                
            </div>
        </div>
    </React.Fragment>
)
}

export default ProductItem